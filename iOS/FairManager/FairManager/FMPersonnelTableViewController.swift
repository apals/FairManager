//
//  FMPersonnelTableViewController.swift
//  FairManager
//
//  Created by Oscar Alsing on 22/04/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit

class FMPersonnelTableViewController: UITableViewController {
    
    var personnel:[Person]?
    var chosenIndex:Int = 0
    var chosenSection:Int = 0

    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let settings = dataFactory.getSettings() {
            self.navigationItem.title = settings.personnelViewTitle
        }
        
        if let personnel = dataFactory.getPersonnel() {
            self.personnel = personnel
        }

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
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
        if let personnel = self.personnel {
            return personnel.count
        } else {
            return 0
        }
    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("FMPersonTableViewCell", forIndexPath: indexPath)
        
        if let personnel = self.personnel {
            if let name = personnel[indexPath.row].name {
                cell.textLabel?.text = name
            }
        }

        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        chosenIndex = indexPath.row
        chosenSection = indexPath.section
        self.performSegueWithIdentifier("personnelSegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if let personnel = self.personnel {
            let person:Person = personnel[chosenIndex]
            let segueViewController = segue.destinationViewController as! FMPersonnelDetailViewController
            segueViewController.setPerson(person)
        }
    }

}
