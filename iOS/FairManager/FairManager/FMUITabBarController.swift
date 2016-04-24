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
            
            
            var tabs:[UIViewController] = []
            
            print(settings)
            
            if settings.exhibitorViewIsActive {
                let companyNav = FMUINavigationController()
                let companyIcon = UITabBarItem(title: "Companies", image: UIImage(named: "shop"), selectedImage: UIImage(named: "shop"))
                companyNav.tabBarItem = companyIcon
                let view = FMCompanyTableViewController(nibName: nil, bundle: nil)
                companyNav.viewControllers = [view]
                tabs.append(companyNav)
            }
            
            if settings.eventViewIsActive {
                let eventNav = FMUINavigationController()
                let eventIcon = UITabBarItem(title: "Events", image: UIImage(named: "calendar"), selectedImage: UIImage(named: "calendar"))
                eventNav.tabBarItem = eventIcon
                let view = FMEventTableViewController(nibName: nil, bundle: nil)
                eventNav.viewControllers = [view]
                tabs.append(eventNav)
            }
            
            if settings.personnelViewIsActive {
                let personnelNav = FMUINavigationController()
                let personnelIcon = UITabBarItem(title: "Personnel", image: UIImage(named: "user"), selectedImage: UIImage(named: "user"))
                personnelNav.tabBarItem = personnelIcon
                let view = FMPersonnelTableViewController(nibName: nil, bundle: nil)
                personnelNav.viewControllers = [view]
                tabs.append(personnelNav)
            }
            
            
            self.viewControllers = tabs
        }
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
