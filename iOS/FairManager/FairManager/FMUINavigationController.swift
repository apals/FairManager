//
//  FMUINavigationController.swift
//  FairManager
//
//  Created by Oscar Alsing on 01/04/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit


class FMUINavigationController: UINavigationController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let settings = dataFactory.getSettings() {
            if let barTintColor = settings.primaryColor {
                self.navigationBar.barTintColor = barTintColor
            }
            if let tintColor = settings.tintColor {
                self.navigationBar.tintColor = tintColor
            }
            if let titleTextColor = settings.titleTextColor {
                self.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName : titleTextColor]
            }
            
        }
        
        
        
        self.navigationBar.translucent = false
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
