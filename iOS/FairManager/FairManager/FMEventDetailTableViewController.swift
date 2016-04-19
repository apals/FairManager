//
//  FMEventDetailTableViewController.swift
//  FairManager
//
//  Created by Oscar Alsing on 09/04/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit
import Haneke

class FMEventDetailTableViewController: UITableViewController {
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var banner: UIImageView!
    @IBOutlet weak var locationLabel: UILabel!
    @IBOutlet weak var registrationLabel: UILabel!
    @IBOutlet weak var infoLabel: UILabel!
    
    var event:Event?
    var registrationLinkIsActive:Bool = false

    override func viewDidLoad() {
        super.viewDidLoad()
        
        addBlurView()
        
        showLoadingHUD()
        
        tableView.estimatedRowHeight = 44.0
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.tableFooterView = UIView()
    }
    
    override func viewDidAppear(animated: Bool) {
        self.tableView.reloadData()
        
    }
    
    func setEvent(event:Event) {
        self.event = event
        print(event)
        setupEventView()
        //setupCompanyView()
        removeSubview(666)
        hideLoadingHUD()
    }
    
    private func setupEventView() {
        banner.clipsToBounds = true
        if let event = self.event {
            if let name = event.name {
                self.navigationItem.title = name
            }
            if let url = event.imageUrl {
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
            
            if let registration = event.registrationReguired {
                if registration {
                    if let startDate = event.registrationStartDate {
                        if let endDate = event.registrationEndDate {
                            let date = NSDate()
                            if date.isGreaterThanDate(endDate) {
                                registrationLabel.text = "Registration is over"
                            } else if date.isLessThanDate(endDate) && date.isGreaterThanDate(startDate){
                                if let _ = event.registrationUrl {
                                    registrationLabel.text = "Register here"
                                    self.registrationLinkIsActive = true
                                } else {
                                    registrationLabel.text = "Registration url missing"
                                }
                            } else {
                                registrationLabel.text = "Registration opens at \(startDate.shortDate)"
                            }
                        } else {
                            registrationLabel.text = "No registration end date"
                        }
                    } else {
                        registrationLabel.text = "No registration start date"
                    }
                } else {
                    registrationLabel.text = "No registration required"
                }
            } else {
                registrationLabel.text = "Registration TBA"
            }
            
            if let date = event.startDate {
                dateLabel.text = tidyEventDateString(date)
            } else {
                dateLabel.text = "Date TBA"
            }
            
            if let location = event.location {
                locationLabel.text = location
            } else {
                locationLabel.text = "Location TBA"
            }
            
            if let info = event.info {
                infoLabel.text = info
            } else {
                infoLabel.text = "Information TBA"
            }
        }
    }
    
    private func tidyEventDateString(date:NSDate) -> String {
        let calendar = NSCalendar.currentCalendar()
        let components = calendar.components([.Day , .Month , .Year, .Hour, .Minute], fromDate: date)
        
        let dateFormatter: NSDateFormatter = NSDateFormatter()
        let months = dateFormatter.shortMonthSymbols
        let monthSymbol = months[components.month-1]
        return "\(components.day) \(monthSymbol) \(date.time) \(components.year)"
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return UITableViewAutomaticDimension
    }
    
    override func tableView(tableView: UITableView, willSelectRowAtIndexPath indexPath: NSIndexPath) -> NSIndexPath? {
        if(indexPath.row == 0 && self.registrationLinkIsActive) {
            return indexPath
        } else {
            return nil
        }
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        if(indexPath.row == 0 && self.registrationLinkIsActive) {
            if let url = event?.registrationUrl{
                if let url = NSURL(string: url) {
                    UIApplication.sharedApplication().openURL(url)
                }
            }
        }
    }

}
