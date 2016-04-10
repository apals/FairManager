//
//  FMUITabBarController.swift
//  FairManager
//
//  Created by Oscar Alsing on 04/04/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit

class FMUITabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let settings = dataFactory.getSettings() {
            self.tabBar.tintColor = settings.primaryColor
        }
        
        /*
        let tabBarControllerItems = self.tabBar.items
        var viewControllers = self.tabBarController!.viewControllers
        
        if let arrayOfTabBarItems = tabBarControllerItems as! AnyObject as? NSArray{
            
            
            if let settings = dataFactory.getSettings() {
                if let active = settings.exhibitorViewIsActive {
                    tabBarItem.
                    tabBarItem = arrayOfTabBarItems[0] as! UITabBarItem
                    tabBarItem.enabled = active
                    if let title = settings.exhibitorViewTitle {
                        tabBarItem.title = title
                    }
                }
                
                if let active = settings.eventViewIsActive {
                    tabBarItem = arrayOfTabBarItems[1] as! UITabBarItem
                    tabBarItem.enabled = active
                    if let title = settings.eventViewTitle {
                        tabBarItem.title = title
                    }
                }
                
                if let active = settings.partnerViewIsActive {
                    tabBarItem = arrayOfTabBarItems[2] as! UITabBarItem
                    tabBarItem.enabled = active
                    if let title = settings.partnerViewTitle {
                        tabBarItem.title = title
                    }
                }
                
                if let active = settings.contactViewIsActive {
                    tabBarItem = arrayOfTabBarItems[3] as! UITabBarItem
                    tabBarItem.enabled = active
                    if let title = settings.contactViewTitle {
                        tabBarItem.title = title
                    }
                }
                
                if let active = settings.personnelViewIsActive {
                    if active {
                        if let title = settings.personnelViewTitle {
                            tabBarItem.title = title
                        }
                    } else {
                        var viewControllers = self.tabBarController!.viewControllers
                        viewControllers?.removeAtIndex(4)
                    }
                }
            }
        }*/
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
