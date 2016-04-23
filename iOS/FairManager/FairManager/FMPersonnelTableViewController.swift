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
    var personnelDictionary:[String: [Person]]?
    var personnelGroupList:[String]?
    var chosenIndex:Int = 0
    var chosenSection:Int = 0

    override func viewDidLoad() {
        super.viewDidLoad()
        
        refreshData(self)
        
        if let settings = dataFactory.getSettings() {
            self.navigationItem.title = settings.personnelViewTitle
        }
    }

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        if let groups = self.personnelGroupList {
            return groups.count
        } else {
            return 0
        }
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if let groups = self.personnelGroupList {
            let group = groups[section]
            if let personnelDictionary = self.personnelDictionary {
                if let personnel = personnelDictionary[group] {
                    return personnel.count
                }
            }
        }
        return 0
    }
    
    func refreshData(sender:AnyObject){
        if let personnel = dataFactory.getPersonnel() {
            self.personnel = personnel
            self.personnelDictionary = [String: [Person]]()
            self.personnel!.sortInPlace({$0.name < $1.name})
            
            for person in self.personnel! {
                if let group = person.group {
                    if let _ = self.personnelDictionary![group] {
                        self.personnelDictionary![group]!.append(person)
                    } else {
                        self.personnelDictionary![group] = [person]
                    }
                }
            }
            
            self.personnelGroupList = self.personnelDictionary!.keys.map { String($0) }.sort()
            
        }
    }
    
    override func tableView(tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 20
    }
    
    override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if let groups = self.personnelGroupList {
            return groups[section]
        } else {
            return nil
        }
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("FMPersonTableViewCell", forIndexPath: indexPath)
        
        if let groups = self.personnelGroupList {
            let group:String = groups[indexPath.section]
            if let personnelDictionary = self.personnelDictionary {
                if let personnel = personnelDictionary[group] {
                    let person:Person = personnel[indexPath.row]
                    if let name = person.name {
                        cell.textLabel?.text = name
                    }
                }
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
        
        if let groups = self.personnelGroupList {
            let group:String = groups[chosenSection]
            if let personnelDictionary = self.personnelDictionary {
                if let personnel = personnelDictionary[group] {
                    let person:Person = personnel[chosenIndex]
                    let segueViewController = segue.destinationViewController as! FMPersonnelDetailViewController
                    segueViewController.setPerson(person)
                }
            }
        }
    }

}
