//
//  FMCompanyDetailTableViewController.swift
//  FairManager
//
//  Created by Oscar Alsing on 02/04/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit
import Haneke

class FMCompanyDetailTableViewController: UITableViewController {
    @IBOutlet weak var banner: UIImageView!
    @IBOutlet weak var aboutText: UILabel!
    var company:Company?


    override func viewDidLoad() {
        super.viewDidLoad()
        
        let blurEffect = UIBlurEffect(style: UIBlurEffectStyle.Dark)
        let blurEffectView = UIVisualEffectView(effect: blurEffect)
        blurEffectView.frame = view.bounds
        blurEffectView.autoresizingMask = [.FlexibleWidth, .FlexibleHeight] // for supporting device rotation
        blurEffectView.tag = 666
        blurEffectView.layer.zPosition = 1
        view.addSubview(blurEffectView)
        
        showLoadingHUD()
        tableView.estimatedRowHeight = 44.0
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.tableFooterView = UIView()
    }
    
    override func viewDidAppear(animated: Bool) {
        self.tableView.reloadData()
        
    }
    
    func setCompany(company:Company) {
        
        self.company = company
        setupCompanyView()
        removeSubview(666)
        hideLoadingHUD()
    }
    
    private func setupCompanyView() {
        banner.clipsToBounds = true
        if let company = self.company {
            if let name = company.name {
                self.navigationItem.title = name
            }
            if let url = company.bannerUrl {
                if let url = NSURL(string: url) {
                    let cache = Shared.imageCache
                    let fetcher = NetworkFetcher<UIImage>(URL: url)
                    cache.fetch(fetcher: fetcher).onSuccess { image in
                        let ratio = image.size.height / image.size.width
                        
                        let newHeight = self.banner.frame.width * ratio
                        
                        let frame = CGRectMake(0, 0, 320, newHeight)
                        self.banner.image = image
                        self.banner.frame = frame
                        
                        self.tableView.reloadData()
                    }
                }
            }
            if let info = company.info {
                aboutText.text = info
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return UITableViewAutomaticDimension
    }
    
    func removeSubview(tag:Int){
        if let viewWithTag = self.view.viewWithTag(tag) {
            UIView.animateWithDuration(0.5, delay: 0.0, options: UIViewAnimationOptions.CurveEaseOut, animations: {
                viewWithTag.alpha = 0.0 // Instead of a specific instance of, say, birdTypeLabel, we simply set [thisInstance] (ie, self)'s alpha
                }, completion: nil)
            //viewWithTag.removeFromSuperview()
        }else{
            print("Did not find subview with tag \(tag)")
        }
    }

    // MARK: - Table view data source
/*
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("companyDetailCell", forIndexPath: indexPath)
        print(cell)

        // Configure the cell...

        return cell
    } */
    

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

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
