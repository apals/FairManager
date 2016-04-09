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
    var chosenSection = 0
    var companiesDictionary:[String: [Company]]?
    var companiesCharacterList:[String]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.tableFooterView = UIView()

        
        showLoadingHUD()
        
        if let settings = dataFactory.getSettings() {
            self.navigationItem.title = settings.exhibitorViewTitle
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
                self.displayErrorOnTableView(self.tableView)
            }
            if(companies != nil) {
                self.companiesDictionary = [String: [Company]]()
                var companies:[Company] = companies!
                companies.sortInPlace({$0.name < $1.name})
                
                for company in companies {
                    let firstChar:String = String((company.name?.characters.first)!)
                    
                    if let _ = self.companiesDictionary![firstChar] {
                        self.companiesDictionary![firstChar]!.append(company)
                    } else {
                        self.companiesDictionary![firstChar] = [company]
                    }
                }
                
                self.companiesCharacterList = self.companiesDictionary!.keys.map { String($0) }.sort()
                
                
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
    
    override func sectionIndexTitlesForTableView(tableView: UITableView) -> [String]? {
        if let characterList = self.companiesCharacterList {
            return characterList
        } else {
            return nil
        }
    }
    
    override func tableView(tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 20
    }
    
    override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if let characterList = self.companiesCharacterList {
            return characterList[section]
        } else {
            return nil
        }
    }
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        if let characterList = self.companiesCharacterList {
            return characterList.count
        } else {
            return 0
        }
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        if let characterList = self.companiesCharacterList {
            let sectionCharacter = characterList[section]
            if let companiesDictionary = self.companiesDictionary {
                if let companies = companiesDictionary[sectionCharacter] {
                    return companies.count
                }
            }
        }
        
        return 0
    }
    
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("FMCompanyTableViewCell", forIndexPath: indexPath) as! FMCompanyTableViewCell
        
        if let characterList = self.companiesCharacterList {
            let character:String = characterList[indexPath.section]
            if let companiesDict = self.companiesDictionary {
                if let companies = companiesDict[character] {
                    let company:Company = companies[indexPath.row]
                    if let name = company.name {
                        cell.companyNameLabel.text = name
                    }
                    
                    if let image = company.logoUrl {
                        let url = NSURL(string: image)
                        cell.logoImageView.hnk_setImageFromURL(url!, placeholder: UIImage(named: "FM"), format: nil, failure: nil, success: nil)
                    }
                }
            }
        }
        
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        chosenIndex = indexPath.row
        chosenSection = indexPath.section
        self.performSegueWithIdentifier("companySegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if let characterList = self.companiesCharacterList {
            let section:String = characterList[chosenSection]
            if let companiesDict = self.companiesDictionary {
                if let companies = companiesDict[section] {
                    let company:Company = companies[chosenIndex]
                    let segueViewController = segue.destinationViewController as! FMCompanyDetailTableViewController
                    
                    if let id = company.id {
                        
                        
                        dataFactory.getCompany(id) { company, error in
                            if(error != nil) {
                                print("error")
                            }
                            if(company != nil) {
                                segueViewController.setCompany(company!)
                            }
                        }
                    }
                }
            }
        }
    }
    
    override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        if let settings = dataFactory.getSettings() {
            return settings.exhibitorCellHeight
        }
        return 55
    }
    
}

extension UIViewController {
    func showLoadingHUD() {
        let hud = MBProgressHUD.showHUDAddedTo(self.view, animated: true)
        hud.layer.zPosition = 2
        if let navBarHeight = self.navigationController?.navigationBar.frame.height{
            hud.yOffset = -Float(navBarHeight)
        }
        hud.labelText = "Loading..."
    }
    
    func hideLoadingHUD() {
        MBProgressHUD.hideAllHUDsForView(self.view, animated: true)
    }
    
    func removeSubview(tag:Int){
        if let viewWithTag = self.view.viewWithTag(tag) {
            UIView.animateWithDuration(0.75, delay: 0.0, options: UIViewAnimationOptions.CurveEaseOut, animations: {
                viewWithTag.alpha = 0.0 // Instead of a specific instance of, say, birdTypeLabel, we simply set [thisInstance] (ie, self)'s alpha
                }, completion: nil)
            //viewWithTag.removeFromSuperview()
        }else{
            print("Did not find subview with tag \(tag)")
        }
    }
    
    func displayErrorOnTableView(view:UITableView){
        let label:UILabel = UILabel(frame: CGRectMake(0, 0, view.bounds.width, view.bounds.height))
        label.text = "Unable to fetch exhibitors.."
        label.numberOfLines = 0
        label.textAlignment = .Center
        label.sizeToFit()
        view.backgroundView = label
        view.separatorStyle = .None
    }
    
    func addBlurView() {
        let blurEffect = UIBlurEffect(style: UIBlurEffectStyle.Dark)
        let blurEffectView = UIVisualEffectView(effect: blurEffect)
        blurEffectView.frame = view.bounds
        blurEffectView.autoresizingMask = [.FlexibleWidth, .FlexibleHeight] // for supporting device rotation
        blurEffectView.tag = 666
        blurEffectView.layer.zPosition = 1
        view.addSubview(blurEffectView)
    }

}
