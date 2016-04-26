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
            
            if settings.exhibitorViewIsActive {
                tabs.append(generateTabViewNav(settings.exhibitorViewTitle, imageName: "shop", type: "Exhibitor"))
            }
 
            
            if settings.eventViewIsActive {
                tabs.append(generateTabViewNav(settings.eventViewTitle, imageName: "calendar", type: "Event"))

            }
            
            if settings.personnelViewIsActive {
                tabs.append(generateTabViewNav(settings.personnelViewTitle, imageName: "user", type: "Personnel"))
            }
            
            self.viewControllers = tabs
        }
    }
    
    private func generateTabViewNav(iconTitle:String, imageName:String, type:String) -> FMUINavigationController {
        let nav = FMUINavigationController()
        let icon = UITabBarItem(title: iconTitle, image: UIImage(named: imageName), selectedImage: UIImage(named: imageName))
        nav.tabBarItem = icon
        
        var view:UIViewController = UIViewController()
        
        switch type {
        case "Exhibitor":
            view = UIStoryboard(name: "Main", bundle: nil).instantiateViewControllerWithIdentifier("Exhibitors") as! FMCompanyTableViewController
            break
        case "Event":
            view = UIStoryboard(name: "Main", bundle: nil).instantiateViewControllerWithIdentifier("Events") as! FMEventTableViewController
            break
        case "Personnel":
            view = UIStoryboard(name: "Main", bundle: nil).instantiateViewControllerWithIdentifier("Personnel") as! FMPersonnelTableViewController
            break
        default:
            break
        }
        
        nav.viewControllers = [view]
        return nav
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
