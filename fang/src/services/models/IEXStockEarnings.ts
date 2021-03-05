export class IEXStockEarnings {
  actualEPS: number = 0; //Actual earnings per share for the period
  consensusEPS: number = 0; //Consensus EPS estimate trend for the period
  announceTime: string = ''; //Time of earnings announcement. BTO (Before open), DMT (During trading or if the time is unknown), AMC (After close)
  numberOfEstimates: number = 0; //Number of estimates for the period
  EPSSurpriseDollar: number = 0; //Dollar amount of EPS surprise for the period
  EPSReportDate: string = ''; //Expected earnings report date YYYY-MM-DD
  fiscalPeriod: string = ''; //The fiscal quarter the earnings data applies to Q# YYYY
  fiscalEndDate: string = ''; //Date representing the company fiscal quarter end YYYY-MM-DD
  yearAgo: number = 0; //Represents the EPS of the quarter a year ago
  yearAgoChangePercent: number = 0; //Represents the percent difference between the quarter a year ago actualEPS and current period actualEPS. Returned as a decimal – for example a 13% decline is returned as –0.13.
  estimatedChangePercent: number = 0; //Represents the percent difference between the quarter a year ago actualEPS and current period consensusEPS
  symbol: string = ''; //The symbol the earning relates to
  quote: object = {}; //See quote
}
