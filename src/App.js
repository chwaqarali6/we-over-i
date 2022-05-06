import React, {useEffect, useState, useMemo, useRef} from 'react'
import './App.css'
import ReactFullpage from '@fullpage/react-fullpage' 
import { gsap } from "gsap"

import CustomCursor from 'custom-cursor-react'
import 'custom-cursor-react/dist/index.css'

import Logo from './assets/images/Logo.png'
import JohnLennon from './assets/images/JohnLennon.png'
import Signature from './assets/images/Signature.png'
import Scroll from './assets/images/Scroll.gif'
import JoinTeam from './components/JoinTeam'
import BecomePartner from './components/BecomePartner'

import { prepareMainTimelines, prepareMenuTimeline, prepareJoinTeamTimeline, prepareBecomePartnerTimeline, toggleScroll, hideNavigation } from './Functions'

const App = () => {
	gsap.config({ force3D: false, nullTargetWarn: false })
	gsap.defaults({ duration: 1 })

	const Timelines = useMemo(() => Array.from({length: 10}, ()=>gsap.timeline({paused: true})), [])
	const MenuTimeline = useMemo(() => gsap.timeline({paused: true}), [])
	const JoinTeamTimeline = useMemo(() => gsap.timeline({paused: true}), [])
	const BecomePartnerTimeline = useMemo(() => gsap.timeline({paused: true}), [])
	const [currentSection, setCurrentSection] = useState(0)
	// const [animationPlaying, setAnimationPlaying] = useState(false)
	const [joinTeamModal, setJoinTeamModal] = useState(false)
	const [becomePartnerModal, setBecomePartnerModal] = useState(false)
	const DocRefs = useRef(null)

	useEffect ( () => {
		DocRefs.current = {
			Root: document.getElementById('root'),
			Header: document.getElementById('Header'),
			CompanyLogo: document.getElementsByClassName('CompanyLogo'),
			Hero: document.getElementsByClassName('Hero'),
			Emblem: document.getElementsByClassName('Emblem'),
			Path1: document.getElementsByClassName('Path1'),
			Path2: document.getElementsByClassName('Path2'),
			Path3: document.getElementsByClassName('Path3'),
			MenuTitles: document.getElementById('MenuTitles'),
			JohnLennonSlide: document.getElementById('JohnLennonSlideContent'),
			Quotes: document.getElementById('Quotes'),
			JohnLennon: document.getElementById('JohnLennon'),
			Signature: document.getElementById('Signature'),
			JourneyTitles: document.getElementsByClassName('JourneyTitles'),
			Scroll: document.getElementById('Scroll'),
			MobileFooter: document.getElementById('MobileFooter'),
			Links: document.getElementsByClassName('Links'),
			Navigation: document.getElementById('fp-nav'),
			CTAs: document.getElementById('CTAs'),
			JoinTeam: document.getElementById('JoinTeam'),
			BecomePartner: document.getElementById('BecomePartner')
		}

		const Navigation = document.getElementById('fp-nav')
		const MenuEmblem = document.getElementById('MenuEmblem')
		Navigation.classList.add('FlexColumnBox')
		Navigation.insertBefore(MenuEmblem, Navigation.children[0])

		prepareMainTimelines(Timelines, DocRefs.current)
		prepareMenuTimeline(MenuTimeline, DocRefs.current)
		prepareJoinTeamTimeline(JoinTeamTimeline, DocRefs.current)
		prepareBecomePartnerTimeline(BecomePartnerTimeline, DocRefs.current)

		document.querySelector('#JoinTeam').addEventListener('mouseenter', () => JoinTeamTimeline.play())
		document.querySelector('#JoinTeam').addEventListener('mouseleave', () => JoinTeamTimeline.reverse())
		document.querySelector('#BecomePartner').addEventListener('mouseenter', () => BecomePartnerTimeline.play())
		document.querySelector('#BecomePartner').addEventListener('mouseleave', () => BecomePartnerTimeline.reverse())
		document.querySelector('#MenuEmblem').addEventListener('click', () => { MenuTimeline.invalidate(); MenuTimeline.restart() })
	}, [Timelines, MenuTimeline, JoinTeamTimeline, BecomePartnerTimeline])

	useEffect ( () => {
		hideNavigation(currentSection<3 || currentSection===9)
	}, [currentSection])

	// useEffect ( () => {
	// 	toggleScroll(!(joinTeamModal || becomePartnerModal || animationPlaying))
	// }, [joinTeamModal, becomePartnerModal, animationPlaying])
	useEffect ( () => {
		toggleScroll(!(joinTeamModal || becomePartnerModal))
	}, [joinTeamModal, becomePartnerModal])


	const Cursor = () => (
		<CustomCursor
			dimensions={48}
			fill={'transparent'}
			strokeColor={'#00134B'}
			strokeWidth={1}
			opacity={1}
			// targetScale={2}
			// targetOpacity={1}
			smoothness={{ movement: 1, scale: 1, opacity: 1 }}
			customClass='CustomCursor'
			// targets={['.CTAbutton', '.ContactTitle']}
		/>
	)

	const FullPageJs = () => (
		<ReactFullpage
			navigation
			loopBottom = {true}
			normalScrollElements = {'.ant-modal-body'}
			onLeave = {(origin, destination, direction) => {
				// console.log('org:', origin.index, 'dest:', destination.index, 'dir:', direction)
				setCurrentSection(destination.index)
				// setAnimationPlaying(true)
				// console.log('Start', new Date())
				Timelines[origin.index].kill()
				Timelines[destination.index].invalidate()
				Timelines[destination.index].restart()
				Timelines[destination.index].eventCallback('onComplete', ()=>{
					// console.log('Complete', new Date())
					// setAnimationPlaying(false)
				})
			}}
			render={() => (
				<ReactFullpage.Wrapper>
					<div className='section'></div>
					<div className='section'></div>
					<div className='section'></div>
					<div className='section'></div>
					<div className='section'></div>
					<div className='section'></div>
					<div className='section'></div>
					<div className='section'></div>
					<div className='section'></div>
					<div className='section'></div>
				</ReactFullpage.Wrapper>
			)}
		/>
	)

	const Emblem = () => (
		<div className='FullWidthHeight NoPadding'>
			<svg viewBox='0 0 721 800' className='Emblem'>
				<polygon className='Path1' style={{fill: '#FFFFFF'}} points="721,503 0,206 0,0 721,297" />
				<polygon className='Path2' style={{fill: '#FFFFFF'}} points="0,800 721,503 721,297 0,594" />
				<polygon className='Path3' style={{fill: '#FFFFFF'}} points="470.9,400 721,503 721,297" />
			</svg>
		</div>
	)

	const HeroText = () => (
		<div className='FullWidthHeight FlexColumnCenter Hero'>
			<p className='HeroTitle NoPaddingMargin '>
				‘We Over I’<br/>
				is a venture builder that works<br/>
				to solve important problems.
			</p>
			<p className='HeroDescription NoPaddingMargin'>
				A team powered by some of the finest Pakistani talent, we partner<br/>
				with startups all over the world to merge our talent with theirs and<br/>
				become an extension of their team.
			</p>
			
		</div>
	)

	const JohnLennonQuote = () => (
		// <div id='Quotes' className='JohnLennonQuote FullHeight FlexColumnBox AbsolutePosition TopLeft ContentPadding'>
		// 		<div className='Quotes FlexColumnSpace NoAlpha'>
		// 			<p>'A dream you<br/>dream alone is<br/>only a dream...</p>
		// 			<p>a dream you<br/>dream together<br/>is reality.'</p>
		// 		</div>
		// 	</div>
		// 	<div id='JohnLennon' className='JohnLennonQuote FullWidthHeight FlexRowBox'>
		// 		<img src={JohnLennon} className='JohnLennon NoAlpha' alt=''/>
		// 	</div>
		// 	<div id='Signature' className='JohnLennonQuote FullHeight FlexColumnBox AbsolutePosition TopRight ContentPadding'>
		// 		<img src={Signature} className='Signature NoAlpha' alt=''/>
		// 	</div>
		
		<div id='JohnLennonSlide' className='FullWidthHeight FlexColumnBox ContentPadding'>
			<div id='JohnLennonSlideContent'>
				<div id='Quotes' className='FullHeight FlexColumnBox AbsolutePosition TopLeft LeftContentPadding'>
					<div className='Quotes FlexColumnSpace NoAlpha'>
						<p>'A dream you<br/>dream alone is<br/>only a dream...</p>
						<p>a dream you<br/>dream together<br/>is reality.'</p>
					</div>
				</div>
				<div id='JohnLennon' className='FullWidthHeight FlexRowBox'>
					<img src={JohnLennon} className='JohnLennon NoAlpha' width='1138' height='1138' alt=''/>
				</div>
				<div id='Signature' className='FullHeight FlexColumnBox AbsolutePosition TopRight RightContentPadding'>
					<img src={Signature} className='Signature NoAlpha' width='250' height='77.52' alt=''/>
				</div>
			</div>
		</div>
	)

	const JourneyTitles = () => (
		<div className='JourneyTitles FullWidthHeight'>
			{/* <p className='AbsolutePosition TopLeft NoOpacity'>
				The startup journey<br/>
				is hard.<br/><br/>
				You're fighting against<br/>
				insurmountable odds<br/>
				to build something that<br/>
				will change the world.
			</p>
			<p className='AbsolutePosition TopRight WhiteColor NoOpacity'>
				We want to be a part of<br/>
				that transformation,<br/>
				your very own story<br/>
				of change.
			</p>
			<p className='FullHeight FlexColumnBox AbsolutePosition TopRight WhiteColor NoOpacity'>
				We invite you to collaborate<br/>
				with us - an extended team<br/>
				of some of the finest engineers<br/>
				and designers from Pakistan.<br/>
			</p>
			<p className='FullWidthHeight FlexColumnBox WhiteColor NoOpacity'>
				Our goal is to be your<br/>
				ideal early product team:<br/>
				fast, driven and affordable.
			</p>
			<p className='AbsolutePosition BottomLeft NoOpacity'>
				We like to work with inspiring<br/>
				founders who are on a mission<br/>
				to change the world.
			</p>
			<p className='AbsolutePosition TopLeft NoOpacity'>
				We promote a culture<br/>
				focused on growth.
			</p> */}
			<p className='AbsolutePosition TopLeft NoOpacity'>
				The startup journey<br/>
				is hard. The odds are<br/>always against you. <br/><br/>
				
				But then again,<br/>changing the world<br/>
				has never been easy
			</p>
			<p className='AbsolutePosition TopRight WhiteColor NoOpacity'>
				We love challenges.<br/>
				We love being outliers.<br/><br/>

				And we want to join<br/>
				your journey to put<br/>
				a dent in the universe
			</p>
			<p className='FullHeight FlexColumnBox AbsolutePosition TopRight WhiteColor NoOpacity'>
				We have gathered the finest<br/>
				engineers in Pakistan and have<br/>
				given them a common purpose:<br/><br/>

				Work with founders from all over the<br/>
				world to solve extraordinary problems
			</p>
			<p className='FullWidthHeight FlexColumnBox WhiteColor NoOpacity'>
				Behind every successful<br/>
				product is a core team that’s<br/>
				committed, fast and passionate.<br/><br/>

				And with us, you get all of that<br/>
				but without having to break the bank.<br/>
			</p>
			<p className='AbsolutePosition BottomLeft NoOpacity'>
				Our criteria is<br/>
				pretty straightforward.<br/><br/>

				We want to partner with<br/>
				founders who inspire us.<br/>
				Awe-inspiring individuals<br/>
				working for the greater good.
			</p>
			<p className='AbsolutePosition TopLeft NoOpacity'>
				Just like our work, our culture<br/>
				is hyper-focused on the growth<br/>
				and development of our talent.<br/><br/>
				Our team is our greatest asset.
			</p>
		</div>
	)

	const Header = () => (
		<div id='Header' className='FullWidth FlexRowSpace ZIndex2'>
			<img className='CompanyLogo' src={Logo} width='1767' height='383' alt=''/>
			<div className='CTAbutton FlexRowBox' onClick={()=>window.fullpage_api.silentMoveTo(10)}>Get in Touch</div>
		</div>
	)

	const ScrollDiv = () => (
		<div id='Scroll' className='FullWidth FlexColumnBox AbsolutePosition BottomRight'>
			<img className='ScrollGif' src={Scroll} alt=''/>
			<p className='ScrollToContinue'>Scroll to continue the journey</p>
		</div>
	)

	const IconLinks = () => (
		<div id='MobileFooter' className='FullWidth FlexColumnBox AbsolutePosition BottomLeft ZIndex2'>
			<div className='MobileFooterCTA FlexRowBox' onClick={()=>window.fullpage_api.silentMoveTo(10)}>Get in Touch</div>
			<div className='FullWidth FlexRowBox MarginTop'>
				<p className='MobileFooterLinks'><a target='_blank' rel="noreferrer" href='https://www.facebook.com/weoveri/'>Facebook</a></p>
				<p className='MobileFooterLinks MarginLeft MarginRight'><a target='_blank' rel="noreferrer" href='https://twitter.com/we_over_i'>Twitter</a></p>
				<p className='MobileFooterLinks'><a target='_blank' rel="noreferrer" href='https://www.linkedin.com/company/14560205'>LinkedIn</a></p>
			</div>
		</div>
	)
	
	const Links = () => (
		<div id='WebFooter' className='FlexColumn RightAlign AbsolutePosition BottomRight ZIndex2'>
			<p className='Links HalfMarginBottom'><a target='_blank' rel="noreferrer" href='https://www.facebook.com/weoveri/'>Facebook</a></p>
			<p className='Links HalfMarginBottom'><a target='_blank' rel="noreferrer" href='https://twitter.com/we_over_i'>Twitter</a></p>
			<p className='Links'><a target='_blank' rel="noreferrer" href='https://www.linkedin.com/company/14560205'>LinkedIn</a></p>
		</div>
	)
	

	const CTAs = () => (
		<div className='FullWidthHeight FlexColumnBox' style={{pointerEvents: 'none'}}>
			<div id='CTAs' className='FlexColumnSpace CenterAlign NoPadding NoAlpha ZIndex2' style={{height: '80%'}} >
				<p
					id='JoinTeam'
					className='ContactTitle WhiteColor Padding' 
					style={{pointerEvents: 'auto'}}
					onClick={()=> window.innerWidth>992 ? setJoinTeamModal(true) : window.open('https://docs.google.com/forms/d/e/1FAIpQLSctuPrY03H79XgenTWW3DsLNkWkljSp955V3DfHvEygW9mS-A/viewform') }
				>Join our Team</p>
				<p 
					id='BecomePartner' 
					className='ContactTitle WhiteColor Padding' 
					style={{pointerEvents: 'auto'}}
					onClick={()=> window.innerWidth>992 ? setBecomePartnerModal(true) : window.open('https://docs.google.com/forms/d/e/1FAIpQLSfiRXljO0c4A7w9AcyAObkkWDNtxZ-bwN8iLUNqC9MWJjUDVA/viewform') }
				>Become a Partner</p>
			</div>
		</div>
	)

	const MenuEmblem = () => (
		<div id='MenuEmblem' className='NoPadding NoMargin'>
			<svg viewBox='0 0 721 800' className='MenuEmblemProps'>
				<polygon style={{fill: '#2E94FA'}} points="721,503 0,206 0,0 721,297" />
				<polygon style={{fill: '#17224D'}} points="0,800 721,503 721,297 0,594" />
				<polygon style={{fill: '#056CDB'}} points="470.9,400 721,503 721,297" />
			</svg>
		</div>
	)

	const MenuTitles = () => (
		<div id='MenuTitles' className='FullWidthHeight NoAlpha ZIndex2'>
			<div className='DisplayFlex AbsolutePosition SlideMenu Slide1Menu' onClick={()=>window.fullpage_api.silentMoveTo(4)}>
				<p className='MenuTitleNumber'>1</p>
				<p className='MenuTitle'>
					The startup journey<br/>
					is hard. The odds are<br/>
					always against you.<br/>
					But then again,<br/>
					changing the world<br/>
					has never been easy
				</p>
			</div>
			<div className='DisplayFlexColumn AbsolutePosition SlideMenu Slide2Menu' onClick={()=>window.fullpage_api.silentMoveTo(5)}>
				<p className='MenuTitleNumber'>2</p>
				<p className='MenuTitle'>
					We love challenges.<br/>
					We love being outliers.<br/>
					And we want to join<br/>
					your journey to put<br/>
					a dent in the universe
				</p>
			</div>
			<div className='DisplayFlexColumn AbsolutePosition SlideMenu Slide3Menu' onClick={()=>window.fullpage_api.silentMoveTo(6)}>
				<p className='MenuTitleNumber'>3</p>
				<p className='MenuTitle'>
					We have gathered the finest<br/>
					engineers in Pakistan and have<br/>
					given them a common purpose:<br/>
					Work with founders from all over the<br/>
					world to solve extraordinary problems
				</p>
			</div>
			<div className='DisplayFlexColumn AbsolutePosition SlideMenu Slide4Menu' onClick={()=>window.fullpage_api.silentMoveTo(7)}>
				<p className='MenuTitleNumber'>4</p>
				<p className='MenuTitle'>
					Behind every successful<br/>
					product is a core team that’s<br/>
					committed, fast and passionate.<br/>
					And with us, you get all of that<br/>
					but without having to break the bank.<br/>
				</p>
			</div>
			<div className='DisplayFlex AbsolutePosition SlideMenu Slide5Menu' onClick={()=>window.fullpage_api.silentMoveTo(8)}>
				<p className='MenuTitleNumber'>5</p>
				<p className='MenuTitle'>
					Our criteria is<br/>
					pretty straightforward.<br/>
					We want to partner with<br/>
					founders who inspire us.<br/>
					Awe-inspiring individuals<br/>
					working for the greater good.
				</p>
			</div>
			<div className='DisplayFlexColumn AbsolutePosition SlideMenu Slide6Menu RightAlign' onClick={()=>window.fullpage_api.silentMoveTo(9)}>
				<p className='MenuTitleNumber'>6</p>
				<p className='MenuTitle'>
					Just like our work, our culture<br/>
					is hyper-focused on the growth<br/>
					and development of our talent.<br/>
					Our team is our greatest asset.
				</p>
			</div>
			<div className='DisplayFlex AbsolutePosition SlideMenu Slide7Menu' onClick={()=>window.fullpage_api.silentMoveTo(10)}>
				<p className='MenuTitleNumber'>7</p>
				<p className='MenuTitle'>
					Get in<br/>
					Touch.
				</p>
			</div>
		</div>
	)
	return ( 
		<>
			{Cursor()}
			{FullPageJs()}
			<div className='ContentBox FullWidthHeight'>
				{Emblem()}
				{HeroText()}
				{JohnLennonQuote()}
				{JourneyTitles()}
				{MenuEmblem()}
				{MenuTitles()}
				{Header()}
				{IconLinks()}
				{ScrollDiv()}
				{Links()}
				{CTAs()}
			</div>

			<JoinTeam joinTeamModal={joinTeamModal} setJoinTeamModal={setJoinTeamModal}/> 
			<BecomePartner becomePartnerModal={becomePartnerModal} setBecomePartnerModal={setBecomePartnerModal}/>
		</>
	)
}

export default App