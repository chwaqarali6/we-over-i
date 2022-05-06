// Timelines[0].to(Emblem, {x: '20px', duration: 1}, '<')
// Timelines[1].to(Emblem, {transformOrigin: 'top left'}, '<')
// Timelines[1].to(Emblem, {transform: 'translate(10vw, 10vh)', duration: 1}, '>')

// Timelines[2].to(Emblem, {}, '<')
Timelines[2].to(Emblem, {transformOrigin: 'top left', transform: 'translate(10vw, 10vh)', duration: 1}, '<')

// Timelines[3].to(Emblem, {top:'65%', left:'50%', direction: 'ltr', duration: 1})

// Timelines[3].to(Emblem, {transformOrigin: 'bottom right'}, '<')
Timelines[3].to(Emblem, {transformOrigin: 'bottom right', transform: 'translate(-10vw, -10vh)', duration: 1})
// Timelines[4].to(Emblem, {transformOrigin: 'center', transform: 'translate(10vw, 10vh)', duration: 1}, '>')
// Timelines[4].to(Emblem, {top: '-20%', right: '35%', direction: 'rtl', duration: 1})