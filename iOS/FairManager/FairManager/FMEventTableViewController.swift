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
                self.tableView.reloadData()
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

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        if let events = self.events {
            return events.count
        } else {
            return 0
        }
    }
    
    override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return 75
    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("FMEventTableViewCell", forIndexPath: indexPath) as! FMEventTableViewCell
        
        
        if let events = self.events {
            let event:Event = events[indexPath.row]
            
            if let name = event.name {
                cell.eventNameLabel.text = name
            }
            
            if indexPath.row == 0 {
                cell.topLine.hidden = true
            }
            
            if indexPath.row == self.tableView.numberOfRowsInSection(0)-1 {
                cell.bottomLine.hidden = true
            }
        }

        // Configure the cell...

        return cell
    }

}
