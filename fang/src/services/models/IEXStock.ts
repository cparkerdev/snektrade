export class IEXStock {
    symbol: string = ""
    companyName: string = ""
    primaryExchange: string =""
    calculationPrice: string = ""
    open: number = 0
    openTime: Date = new Date()
    openSource: string = ""
    close: number = 0
    closeTime: Date = new Date()
    closeSource: string = ""
    high: number = 0
    highTime: Date = new Date()
    highSource: string = ""
    low: number = 0
    lowTime: number = 0
    lowSource: string = ""
    latestPrice: number = 0
    latestSource: string = ""
    latestTime: Date = new Date()
    latestUpdate: Date = new Date()
    latestVolume: number = 0
    iexRealtimePrice: number = 0
    iexRealtimeSize: number = 0
    iexLastUpdated: Date = new Date()
    delayedPrice: number = 0
    delayedPriceTime: Date = new Date()
    oddLotDelayedPrice: number = 0
    oddLotDelayedPriceTime: number = 0
    extendedPrice: number = 0
    extendedChange: number = 0
    extendedChangePercent: number = 0
    extendedPriceTime: number = 0
    previousClose: number = 0
    previousVolume: number = 0
    change: number = 0
    changePercent: number = 0
    volume: number = 0
    iexMarketPercent: number= 0
    iexVolume: number = 0
    avgTotalVolume: number = 0
    iexBidPrice: number = 0
    iexBidSize: number = 0
    iexAskPrice:number = 0
    iexAskSize: number = 0
    iexOpen: number = 0
    iexOpenTime: Date = new Date()
    iexClose: number = 0
    iexCloseTime: Date = new Date()
    marketCap: number = 0
    peRatio: number = 0
    week52High: number = 0
    week52Low: number = 0
    ytdChange: number = 0
    lastTradeTime: number = 0
    isUSMarketOpen: boolean = false
    }


    /*
    {
"symbol":"AMC",
"companyName":"AMC Entertainment Holdings Inc - Class A",
"primaryExchange":"AT HOOY WNR  NI,CENEC.XKGKCES",
"calculationPrice":"close",
"open":2.93,
"openTime":1630746167876,
"openSource":"ilfcafio",
"close":3.52,
"closeTime":1623835608129,
"closeSource":"aciolfif",
"high":3.89,
"highTime":1669868052679,
"highSource":" enemicpi ua 5dedrelyt1",
"low":2.89,
"lowTime":1657891646809,
"lowSource":"lerddeiyeea5pm n1u c it",
"latestPrice":3.55,
"latestSource":"Close",
"latestTime":"January 22, 2021",
"latestUpdate":1641108873253,
"latestVolume":273950766,
"iexRealtimePrice":null,
"iexRealtimeSize":null,
"iexLastUpdated":null,
"delayedPrice":3.55,
"delayedPriceTime":1647906745030,
"oddLotDelayedPrice":3.673,
"oddLotDelayedPriceTime":1662555608688,
"extendedPrice":3.72,
"extendedChange":0.07,
"extendedChangePercent":0.02081,
"extendedPriceTime":1677822863673,
"previousClose":2.99,
"previousVolume":65914921,
"change":0.54,
"changePercent":0.17971,
"volume":275740006,
"iexMarketPercent":null,
"iexVolume":null,
"avgTotalVolume":80620825,
"iexBidPrice":null,
"iexBidSize":null,
"iexAskPrice":null,"iexAskSize":null,
"iexOpen":3.74,
"iexOpenTime":1685466167571,
"iexClose":3.564,
"iexCloseTime":1657001628605,
"marketCap":605144095,
"peRatio":-0.09,
"week52High":7.76,
"week52Low":1.99,
"ytdChange":0.8405512911920195,
"lastTradeTime":1686897968435,
"isUSMarketOpen":false
}
*/