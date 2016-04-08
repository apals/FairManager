//
//  FMTableViewController.swift
//  FairManager
//
//  Created by Oscar Alsing on 10/03/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit
import Haneke
import MBProgressHUD

class FMCompanyTableViewController: UITableViewController {
    @IBOutlet weak var refreshCtrl: UIRefreshControl!
    
    var chosenIndex = 0
    var companies:[Company]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        showLoadingHUD()
        
        if let settings = dataFactory.getSettings() {
            if let title = settings.exhibitorViewTitle {
                self.navigationItem.title = title
            }
            
        }
        
        refreshData(self)
        
        self.refreshControl?.addTarget(self, action: #selector(refreshData), forControlEvents: UIControlEvents.ValueChanged)
        tableView.registerNib(UINib(nibName: "FMCompanyTableViewCell", bundle: nil), forCellReuseIdentifier: "FMCompanyTableViewCell")
        
        
    }
    
    override func viewDidAppear(animated: Bool) {
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
            
            self.hideLoadingHUD()
            
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
            let segueViewController = segue.destinationViewController as! FMCompanyDetailTableViewController
            
            if let id = company.id {
                
                
                dataFactory.getCompany_async(id) { company, error in
                    if(error != nil) {
                        print("error")
                    }
                    if(company != nil) {
                        segueViewController.setCompany(company!)
                    }
                }
                
              /*  print("pre")
                if let company = dataFactory.getCompany(id) {
                    print("fisk")
                    segueViewController.setCompany(company)
                    print("asd")
                }
 */
            }
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
    
}

extension UIViewController {
    func showLoadingHUD() {
        let hud = MBProgressHUD.showHUDAddedTo(self.view, animated: true)
        hud.layer.zPosition = 2
        hud.labelText = "Loading..."
    }
    
    func hideLoadingHUD() {
        MBProgressHUD.hideAllHUDsForView(self.view, animated: true)
    }
}
