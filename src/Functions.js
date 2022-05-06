export const calculateDegrees = (opposite, adjecent) => (Math.atan(opposite/adjecent) * (180 / Math.PI))
export const calculateLeftforHeight = (Width, Height, LeftPercent) => (((Height*721)/800)*-1)+(LeftPercent*Width/100)

export const hideNavigation = (flag) => {
    const Navigation = document.getElementById('fp-nav')
	flag ? Navigation.classList.add('NavigationVisibility') : Navigation.classList.remove('NavigationVisibility')
}

export const toggleScroll = (flag) => {
    window.fullpage_api.setAllowScrolling(flag)
    const Navigation = document.getElementById('fp-nav')
    flag ?  Navigation.classList.remove('NoPointerEvent') : Navigation.classList.add('NoPointerEvent')
}

export const ViewWidth = window.innerWidth
export const ViewHeight = window.innerHeight

export const Backgrounds =  [
    `linear-gradient(${90-calculateDegrees(ViewHeight, ViewWidth)}deg, #99BBFF 0%, #FFE6F7 25%, #FFFFFF 50%, #FFE6F7 75%, #99BBFF 100%)`, 
    'linear-gradient(0.01deg, #FFFFFF 10%, #99CCFF 90%)', 
    `linear-gradient(${90-calculateDegrees(ViewHeight, ViewWidth)}deg, #FFFFFF 20%, #99CCFF 80%)`,
    `linear-gradient(${90+calculateDegrees(ViewHeight, ViewWidth)}deg, #81C0FF 0%, #FFFFFF 100%)`,
    `linear-gradient(${90-calculateDegrees(ViewHeight, ViewWidth)}deg, #0080FF 0%, #80D5FF 100%)`,
    `linear-gradient(${90-calculateDegrees(ViewHeight, ViewWidth)}deg, #001A4E 25%, #004D99 100%)`,
    `linear-gradient(${90+calculateDegrees(ViewHeight, ViewWidth)}deg, #0080FF 0%, #FFD9CC 100%)`,
    `linear-gradient(${90+calculateDegrees(ViewHeight, ViewWidth)}deg, #FFFFFF 0%, #80BFFF 75%)`,
    `linear-gradient(${90+calculateDegrees(ViewHeight, ViewWidth)}deg, #80BFFF 0%, #CCE6FF 100%)`,
    '#FFFFFF',
]

export const prepareMainTimelines = (Timelines, DocRefs) => {
    const TimelineProps = [
        {
            Index: 0,
            ShowHero: true,
            ShowScroll: true,
            ShowLinks: true,
            WhiteEmblem: true,
            EmblemWidth: (0.75*ViewHeight*721/800),
            EmblemHeight: (0.75*ViewHeight),
            EmblemTop: ((ViewHeight-(0.75*ViewHeight))/2),
            EmblemLeft: (0.8*ViewWidth),
            EmblemEffects: true,
        },
        {
            Index: 1,
            EmblemWidth: ViewWidth>=992 ? (0.45*ViewHeight*721/800) : (0.35*ViewHeight*721/800),
            EmblemHeight: ViewWidth>=992 ? (0.45*ViewHeight) : (0.35*ViewHeight),
            EmblemTop: ViewWidth>=992 ? ((ViewHeight-(0.45*ViewHeight))/2) : ((ViewHeight-(0.35*ViewHeight))/2),
            EmblemLeft: ViewWidth>=992 ? ((ViewWidth - (0.45*ViewHeight*721/800))/2) : ((ViewWidth - (0.35*ViewHeight*721/800))/2),
            CenterHeader: true,
        },
        {
            Index: 2,
            EmblemWidth: ViewWidth>=992 ? (0.45*ViewHeight*721/800) : (0.35*ViewHeight*721/800),
            EmblemHeight: ViewWidth>=992 ? (0.45*ViewHeight) : (0.35*ViewHeight),
            EmblemTop: ViewWidth>=992 ? ((ViewHeight-(0.45*ViewHeight))/2) : DocRefs.JohnLennon.offsetTop,
            EmblemLeft: ViewWidth>=992 ? ((ViewWidth - (0.45*ViewHeight*721/800))/2) : ((ViewWidth - (0.35*ViewHeight*721/800))/2),
            CenterHeader: true,
            ShowJohnLennonQuotes: true
        },
        {
            Index: 3,
            EmblemTop: '65%', 
            EmblemLeft: '50%',
        },
        {
            Index: 4,
            EmblemTop: '0%',
            EmblemLeft: calculateLeftforHeight(ViewWidth, 2*ViewHeight, 60),
            EmblemFilter: true,
        },
        {
            Index: 5,
            WhiteNavigation: true,
            LogoFilter: true,
            EmblemTop: -ViewHeight/2,
            EmblemLeft: calculateLeftforHeight(ViewWidth, 2*ViewHeight, ViewWidth>=992 ? 30 : 10),
        },
        {
            Index: 6,
            EmblemTop: '-100%',
            EmblemLeft: calculateLeftforHeight(ViewWidth, 2*ViewHeight, 25),
        },
        {
            Index: 7,
            EmblemTop: -2*ViewHeight+(60*ViewHeight/100),
            EmblemLeft: '60%',
        },
        {
            Index: 8,
            WhiteNavigation: true,
            EmblemTop: '-100%',
            EmblemLeft: '50%',
        },
        {
            Index: 9,
            WhiteNavigation: true,
            EmblemWidth: (ViewHeight*800/206)*721/800,
            EmblemHeight: ViewHeight*800/206,
            EmblemTop: (ViewHeight - (ViewHeight*800/206)*0.5) - (ViewHeight/2),
            EmblemLeft: ((((ViewHeight*800/206)*721)/800)*-1)+ViewWidth+(((ViewHeight*800/206)*250/800)-(ViewWidth/2)),
            CenterHeader: true,
            HideHeader: true,
            ShowCTAs: true
        }
    ]
    TimelineProps.map((TimelineProp, index)=>
        index<3 ? prepareIntroTimelines(Timelines[index], DocRefs, TimelineProp) : prepareJourneyTimelines(Timelines[index], DocRefs, TimelineProp)
    )
}

export const prepareIntroTimelines = (Timeline, DocRefs, Props) => {
    const { Root, Header, Emblem, Path1, Path2, Path3, MenuTitles, Quotes, JohnLennon, Signature, JourneyTitles, CTAs, Scroll, Links, MobileFooter, Hero } = DocRefs
    const { Index, ShowHero, ShowScroll, ShowLinks, ShowJohnLennonQuotes, CenterHeader, EmblemWidth, EmblemHeight, EmblemTop, EmblemLeft, WhiteEmblem, EmblemEffects } = Props

    Timeline.to(Root, {background: Backgrounds[Index], duration: 2})
    Timeline.set(Header, {autoAlpha: 1}, '<')
    ViewWidth>=768 && Timeline.to(Header, {xPercent: CenterHeader ? 50 : 0, x: CenterHeader ? -111.65 : 0}, '<')
    Timeline.to(Hero, {xPercent: ShowHero ? 0 : -100}, '<')
    Timeline.to([Quotes.children, JohnLennon.children, Signature.children], {autoAlpha: ShowJohnLennonQuotes ? 1 : 0}, '<')
    Timeline.to(JourneyTitles[0].children, {autoAlpha: 0}, '<')
    Timeline.to(Scroll, {autoAlpha: ShowScroll ? 1 : 0}, '<')
    Timeline.to([Links, MobileFooter], {autoAlpha: ShowLinks ? 1 : 0}, '<')
    Timeline.to(CTAs, {autoAlpha: 0}, '<')
    Timeline.to(MenuTitles, {autoAlpha: 0}, '<')

    Timeline.to(Emblem, {width: EmblemWidth, height: EmblemHeight}, '<')
    Timeline.to(Emblem, {top: EmblemTop, left: EmblemLeft}, '<')
    EmblemEffects ? Timeline.to(Emblem, {filter: 'blur(10px)', opacity: 0.75}, '<') : Timeline.to(Emblem, {filter: 'blur(0px)', opacity: 1}, '>')
    Timeline.to(Path1, {fill: WhiteEmblem ? '#FFFFFF' : '#2E94FA'}, '<')
    Timeline.to(Path2, {fill: WhiteEmblem ? '#FFFFFF' : '#17224D'}, '<')
    Timeline.to(Path3, {fill: WhiteEmblem ? '#FFFFFF' : '#056CDB'}, '<')
}

export const prepareJourneyTimelines = (Timeline, DocRefs, Props) => {
    const { Root, Header, CompanyLogo, Emblem, Path1, Path2, Path3, MenuTitles, Quotes, JohnLennon, Signature, JourneyTitles, Navigation, CTAs, Scroll, Links, MobileFooter, Hero } = DocRefs
    const { Index, WhiteNavigation, LogoFilter, EmblemWidth, EmblemHeight, EmblemTop, EmblemLeft, EmblemFilter, CenterHeader, HideHeader, ShowCTAs } = Props

    const JouneryEmblemHeight = 2*ViewHeight
    const JouneryEmblemWidth = 2*ViewHeight*721/800

    Timeline.add( () =>  WhiteNavigation ? Navigation.classList.add('WhiteNavigation') : Navigation.classList.remove('WhiteNavigation'))
    Timeline.to(CompanyLogo, {filter: LogoFilter ? 'brightness(100)' : ''}, '<')
    Timeline.to(Root, {background: Backgrounds[Index], duration: 2}, '<')
    Timeline.set(Header, {autoAlpha: HideHeader ? 0 : 1}, '<')
    ViewWidth>=768 && CenterHeader && Timeline.to(Header, {xPercent: 50, x: -111.65}, '<')
    Timeline.to(Hero, {xPercent: -100}, '<')
    Timeline.to(Emblem, {width: EmblemWidth ? EmblemWidth : JouneryEmblemWidth, height: EmblemHeight ? EmblemHeight : JouneryEmblemHeight}, '<')
    Timeline.to(Emblem, {top: EmblemTop, left: EmblemLeft}, '<')
    Timeline.to(Emblem, {top: EmblemTop, left: EmblemLeft}, '<')
    Timeline.to(Emblem, {filter: 'blur(0px)', opacity: 1}, '<')
    Timeline.to(Path1, {fill: EmblemFilter ? '#FAFAFA' : '#2E94FA'}, '<')
    Timeline.to(Path2, {fill: EmblemFilter ? '#C4C4C4' : '#17224D'}, '<')
    Timeline.to(Path3, {fill: EmblemFilter ? '#929292' : '#056CDB'}, '<')
    Timeline.to([Quotes.children, JohnLennon.children, Signature.children], {autoAlpha: 0}, '<')
    Timeline.to(JourneyTitles[0].children, {autoAlpha: 0}, '<')
    JourneyTitles[0].children[Index-3] && Timeline.to(JourneyTitles[0].children[Index-3], {autoAlpha: 1}, '<')
    Timeline.to(MenuTitles, {autoAlpha: 0}, '<')
    Timeline.to(Scroll, {autoAlpha: 0}, '<')
    Timeline.to([Links, MobileFooter], {autoAlpha: 0}, '<')
    ShowCTAs ? Timeline.to(CTAs, {autoAlpha: 1, duration: 0.1}, '>') : Timeline.to(CTAs, {autoAlpha: 0}, '<')
}

export const prepareMenuTimeline = (Timeline, DocRefs) => {
    const { Root, Header, Emblem, Path1, Path2, Path3, MenuTitles, JourneyTitles, Navigation } = DocRefs

    Timeline.add( () => Navigation.classList.add('NavigationVisibility'), '<')
    Timeline.set(Header, {autoAlpha: 0}, '<')
    Timeline.to(Root, {background: 'linear-gradient(230.75deg, #BEE0FF -10.76%, #FFFFFF 82.1%)', duration: 2}, '<')
    Timeline.to(Emblem, {width: (0.5*ViewHeight*721/800), height: (0.5*ViewHeight)}, '<')
    Timeline.to(Emblem, {top: ((ViewHeight-(0.5*ViewHeight))/2), left:((ViewWidth - (0.5*ViewHeight*721/800))/2)}, '<')
    Timeline.to(MenuTitles, {autoAlpha: 1}, '<')
    Timeline.to(JourneyTitles[0].children, {autoAlpha: 0}, '<')
    Timeline.to(Path1, {fill: '#2E94FA'}, '<')
    Timeline.to(Path2, {fill: '#17224D'}, '<')
    Timeline.to(Path3, {fill: '#056CDB'}, '<')
}

export const prepareJoinTeamTimeline = (Timeline, DocRefs) => {
    const { Emblem, JoinTeam } = DocRefs
    Timeline.to(Emblem, {top: ((ViewHeight - (ViewHeight*800/206)*0.5) - (ViewHeight/2) + 50), duration: 0.5}, '<')
    Timeline.to(JoinTeam, {scale: 1.2, duration: 0.5}, '<')
}

export const prepareBecomePartnerTimeline = (Timeline, DocRefs) => {
    const { Emblem, BecomePartner } = DocRefs
    Timeline.to(Emblem, {top: ((ViewHeight - (ViewHeight*800/206)*0.5) - (ViewHeight/2) - 50), duration: 0.5}, '<')
    Timeline.to(BecomePartner, {scale: 1.2, duration: 0.5}, '<')
}