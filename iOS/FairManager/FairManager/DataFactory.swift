//
//  DataFactory.swift
//  FairManager
//
//  Created by Oscar Alsing on 10/03/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import Foundation
import UIKit
import Alamofire
import SwiftyJSON
import UIColor_Hex_Swift


struct Company {
    var name:String?
    var logoUrl:String?
    var bannerUrl:String?
    var id:String?
}

struct Settings {
    var primaryColor:UIColor?
    var primaryTextColor:UIColor?
    var titleTextColor:UIColor?
    var tintColor:UIColor?
    var contentMode:String?
    
    var exhibitorViewIsActive:Bool?
    var eventViewIsActive:Bool?
    var partnerViewIsActive:Bool?
    var contactViewIsActive:Bool?
    var personnelViewIsActive:Bool?
    
    
    var exhibitorViewTitle:String?
    var eventViewTitle:String?
    var partnerViewTitle:String?
    var contactViewTitle:String?
    var personnelViewTitle:String?
    
    var exhibitorCellHeight:CGFloat?
    
}



public class DataFactory {
    
    var settings:Settings?
    
    func getCompanies(completionHandler: ([Company]?, NSError?) -> ()) {
        Alamofire.request(.GET, NSURL(string: "http://fairmanager.herokuapp.com/api/companies")!).validate().responseJSON { response in
            switch response.result {
                case .Success:
                    if let value = response.result.value {
                        let json = JSON(value)
                        var companies:[Company] = []
                        
                        
                        for (_, companyJson):(String, JSON) in json {
                            var company:Company = Company()
                            
                            if(companyJson["name"] != nil){
                                company.name = companyJson["name"].string
                            }
                            
                            if(companyJson["logoUrl"] != nil){
                                company.logoUrl = companyJson["logoUrl"].string
                            }
                            
                            if(companyJson["bannerUrl"] != nil){
                                company.bannerUrl = companyJson["bannerUrl"].string
                            }
                            
                            if(companyJson["_id"] != nil){
                                company.id = companyJson["_id"].string
                            }
                            
                            companies.append(company)
                        }
                        
                        completionHandler(companies, nil)
                    }
                case .Failure(let error):
                    completionHandler(nil, error)
        }
    }
        
    }
    
    var exhibitorViewIsActive:Bool?
    var eventViewIsActive:Bool?
    var partnerViewIsActive:Bool?
    var contactViewIsActive:Bool?
    var personnelViewIsActive:Bool?
    
    
    var exhibitorViewTitle:String?
    var eventViewTitle:String?
    var partnerViewTitle:String?
    var contactViewTitle:String?
    var personnelViewTitle:String?
    
    func getSettings() -> Settings? {
        if let settings = self.settings {
            return settings
        } else {
            return fetchSettings()
        }
    }
    
    func fetchSettings() -> Settings? {
        var settings = Settings()
        
        settings.primaryColor = UIColor(rgba: "#51039a")
        settings.primaryTextColor = UIColor(rgba: "#404040")
        settings.titleTextColor = UIColor.whiteColor()
        settings.tintColor = UIColor.whiteColor()
        settings.contentMode = "Light"
        
        settings.exhibitorViewIsActive = true
        settings.eventViewIsActive = true
        settings.partnerViewIsActive = true
        settings.contactViewIsActive = true
        settings.personnelViewIsActive = true
        
        settings.exhibitorViewTitle = "Exhibitors"
        settings.eventViewTitle = "Events"
        settings.partnerViewTitle = "Partners"
        settings.contactViewTitle = "Contact"
        settings.personnelViewTitle = "Personnel"
        
        settings.exhibitorCellHeight = 55
        
        
        /*
         Alamofire.request(.GET, "http://fairmanager.herokuapp.com/api/settings").validate().responseJSON { response in
         debugPrint(response)
         }*/
        return settings

    }
}

let dataFactory = DataFactory()