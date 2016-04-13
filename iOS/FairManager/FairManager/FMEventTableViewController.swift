//
//  FMEventTableViewController.swift
//  FairManager
//
//  Created by Oscar Alsing on 09/04/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit

class FMEventTableViewController: UITableViewController {
    @IBOutlet weak var refreshCtrl: UIRefreshControl!
    var events:[Event]?
    var pastFutureEventsDictionary:[String: [Event]]?


    override func viewDidLoad() {
        super.viewDidLoad()
        
        showLoadingHUD()
        
        if let settings = dataFactory.getSettings() {
            self.navigationItem.title = settings.eventViewTitle
        }
        
        refreshData(self)
        
        tableView.registerNib(UINib(nibName: "FMEventTableViewCell", bundle: nil), forCellReuseIdentifier: "FMEventTableViewCell")
        
        self.refreshControl?.addTarget(self, action: #selector(refreshData), forControlEvents: UIControlEvents.ValueChanged)
        tableView.registerNib(UINib(nibName: "FMEventTableViewCell", bundle: nil), forCellReuseIdentifier: "FMEventTableViewCell")

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }
    
    func refreshData(sender:AnyObject)
    {
        
        dataFactory.getEvents() { events, error in
            if(error != nil) {
                print("error")
               // self.displayErrorOnTableView(self.tableView)
            }
            if(events != nil) {
                self.events = events
                self.events!.sortInPlace({$0.startDate!.compare($1.startDate!) == NSComparisonResult.OrderedAscending})
                self.pastFutureEventsDictionary = [String: [Event]]()
                self.pastFutureEventsDictionary!["future"] = []
                self.pastFutureEventsDictionary!["past"] = []
                
                if let events = self.events {
                    for event in events {
                        if let startDate = event.startDate {
                            if startDate.isGreaterThanDate(NSDate()) {
                                self.pastFutureEventsDictionary!["future"]!.append(event)
                            } else {
                                self.pastFutureEventsDictionary!["past"]!.append(event)
                            }
                        }
                    }
                }
                
                self.pastFutureEventsDictionary!["future"]!.sortInPlace({$0.startDate!.compare($1.startDate!) == NSComparisonResult.OrderedAscending})
                self.pastFutureEventsDictionary!["past"]!.sortInPlace({$0.startDate!.compare($1.startDate!) == NSComparisonResult.OrderedDescending})
                
                if(self.tableView.numberOfSections == self.pastFutureEventsDictionary!.keys.map { String($0) }.sort().count) {
                    let range = NSMakeRange(0, self.tableView.numberOfSections)
                    let sections = NSIndexSet(indexesInRange: range)
                    self.tableView.reloadSections(sections, withRowAnimation: .Automatic)
                } else {
                    self.tableView.reloadData()
                }
                
                print("sections: \(self.tableView.numberOfSections)")
                print("rows: \(self.tableView.numberOfRowsInSection(0))")
                print("rows: \(self.tableView.numberOfRowsInSection(1))")
            }
            
            self.hideLoadingHUD()
            
            if self.refreshCtrl.refreshing
            {
                self.refreshCtrl.endRefreshing()
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source
    
    override func tableView(tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 20
    }
    
    override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if section == 0 {
            return "Future events"
        } else {
            return "Past events"
        }
    }

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        if let dict = self.pastFutureEventsDictionary {
            return dict.keys.map { String($0) }.sort().count
        } else {
            return 0
        }
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        if let dict = self.pastFutureEventsDictionary {
            if section == 0 {
                if let future = dict["future"] {
                    return future.count
                }
            } else {
                if let past = dict["past"] {
                    return past.count
                }
            }
        }
        
        return 0
    }
    
    override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return 75
    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("FMEventTableViewCell", forIndexPath: indexPath) as! FMEventTableViewCell
        
        if let dict = self.pastFutureEventsDictionary {
            var type:String = ""
            switch indexPath.section {
            case 0:
                type = "future"
                break
            case 1:
                type = "past"
                break
            default:
                return cell
            }
            
            if let events = dict[type] {
                let event:Event = events[indexPath.row]
                
                if let name = event.name {
                    cell.eventNameLabel.text = name
                }
                
                if let date = event.startDate {
                    let calendar = NSCalendar.currentCalendar()
                    let components = calendar.components([.Day , .Month , .Year], fromDate: date)
                    
                    let dateFormatter: NSDateFormatter = NSDateFormatter()
                    let months = dateFormatter.shortMonthSymbols
                    let monthSymbol = months[components.month-1]
                    
                    cell.dateTextLabel.text = String(components.day)
                    cell.monthTextLabel.text = monthSymbol
                }

            }
        }
        // Configure the cell...

        return cell
    }

}

extension NSDate {
    func isGreaterThanDate(dateToCompare: NSDate) -> Bool {
        print(self)
        print(dateToCompare)
        //Declare Variables
        var isGreater = false
        
        //Compare Values
        if self.compare(dateToCompare) == NSComparisonResult.OrderedDescending {
            isGreater = true
        }
        
        //Return Result
        return isGreater
    }
    
    func isLessThanDate(dateToCompare: NSDate) -> Bool {
        //Declare Variables
        var isLess = false
        
        //Compare Values
        if self.compare(dateToCompare) == NSComparisonResult.OrderedAscending {
            isLess = true
        }
        
        //Return Result
        return isLess
    }
    
    func equalToDate(dateToCompare: NSDate) -> Bool {
        //Declare Variables
        var isEqualTo = false
        
        //Compare Values
        if self.compare(dateToCompare) == NSComparisonResult.OrderedSame {
            isEqualTo = true
        }
        
        //Return Result
        return isEqualTo
    }
    
    func addDays(daysToAdd: Int) -> NSDate {
        let secondsInDays: NSTimeInterval = Double(daysToAdd) * 60 * 60 * 24
        let dateWithDaysAdded: NSDate = self.dateByAddingTimeInterval(secondsInDays)
        
        //Return Result
        return dateWithDaysAdded
    }
    
    func addHours(hoursToAdd: Int) -> NSDate {
        let secondsInHours: NSTimeInterval = Double(hoursToAdd) * 60 * 60
        let dateWithHoursAdded: NSDate = self.dateByAddingTimeInterval(secondsInHours)
        
        //Return Result
        return dateWithHoursAdded
    }
}
