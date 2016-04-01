//
//  FMTableViewController.swift
//  FairManager
//
//  Created by Oscar Alsing on 10/03/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit
import Haneke

class FMCompanyTableViewController: UITableViewController {
    @IBOutlet weak var refreshCtrl: UIRefreshControl!
    
    var chosenIndex = 0
    var companies:[Company]?

    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let settings = dataFactory.getSettings() {
            if let title = settings.exhibitorViewTitle {
                self.navigationItem.title = title
            }
            
        }
        
        refreshData(self)

        self.refreshControl?.addTarget(self, action: #selector(refreshData), forControlEvents: UIControlEvents.ValueChanged)
        tableView.registerNib(UINib(nibName: "FMCompanyTableViewCell", bundle: nil), forCellReuseIdentifier: "FMCompanyTableViewCell")


    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func refreshData(sender:AnyObject)
    {
        dataFactory.getCompanies() { companies, error in
            if(error != nil) {
                print("error")
            }
            if(companies != nil) {
                self.companies = companies
                self.tableView.reloadData()
            }
            
            if self.refreshCtrl.refreshing
            {
                self.refreshCtrl.endRefreshing()
            }
        }
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        if let companies = self.companies {
            return companies.count
        } else {
            return 0
        }
    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("FMCompanyTableViewCell", forIndexPath: indexPath) as! FMCompanyTableViewCell
        if let name = companies?[indexPath.row].name {
            cell.companyNameLabel.text = name
        }
        
        if let image = companies?[indexPath.row].logoUrl {
            let url = NSURL(string: image)
            cell.logoImageView.hnk_setImageFromURL(url!, placeholder: UIImage(named: "FM"), format: nil, failure: nil, success: nil)
        }
        
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        chosenIndex = indexPath.row
        self.performSegueWithIdentifier("companySegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if let companies = self.companies {
            let company = companies[chosenIndex]
            let segueViewController = segue.destinationViewController as! FMCompanyViewController
            segueViewController.company = company
        }
    }
    
    override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        if let settings = dataFactory.getSettings() {
            if let height = settings.exhibitorCellHeight {
                return height
            }
        }
        return 65
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

}
