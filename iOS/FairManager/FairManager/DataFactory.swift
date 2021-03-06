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
    var info:String?
    var employees:Int?
    var logoUrl:String?
    var bannerUrl:String?
    var id:String?
}

struct Event {
    var name:String?
    var info:String?
    var location:String?
    var startDate:NSDate?
    var endDate:NSDate?
    var registrationReguired:Bool?
    var registrationStartDate:NSDate?
    var registrationEndDate:NSDate?
    var registrationUrl:String?
    var imageUrl:String?
    var id:String?
}

struct Person {
    var name:String?
    var group:String?
    var imageUrl:String?
    var id:String?
}

struct Settings {
    var primaryColor:UIColor = UIColor(rgba: "#51039a")
    var primaryTextColor:UIColor = UIColor(rgba: "#404040")
    var titleTextColor:UIColor = UIColor.whiteColor()
    var tintColor:UIColor = UIColor.whiteColor()
    var contentMode:String = "Light"
    
    var exhibitorViewIsActive:Bool = false
    var eventViewIsActive:Bool = false
    var partnerViewIsActive:Bool = false
    var contactViewIsActive:Bool = false
    var personnelViewIsActive:Bool = false
    
    
    var exhibitorViewTitle:String = "Exhibitors"
    var eventViewTitle:String = "Events"
    var partnerViewTitle:String = "Partners"
    var contactViewTitle:String = "Contact"
    var personnelViewTitle:String = "Personnel"
    
    var exhibitorCellHeight:CGFloat = 55
    
}



public class DataFactory {
    
    var settings:Settings?
    var baseURL:String = "http://localhost:9000"
    
    func getCompanies(completionHandler: ([Company]?, NSError?) -> ()) {
        Alamofire.request(.GET, NSURL(string: "\(baseURL)/api/companies")!).validate().responseJSON { response in
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
    
    func getCompany(id:String, completionHandler: (Company?, NSError?) -> ()) {
        Alamofire.request(.GET, NSURL(string: "\(baseURL)/api/companies/\(id)")!).validate().responseJSON { response in
            switch response.result {
            case .Success:
                if let value = response.result.value {
                    let json = JSON(value)
                    var company:Company = Company()

                    if(json["name"] != nil){
                        company.name = json["name"].string
                    }
                    
                    if(json["info"] != nil){
                        company.info = json["info"].string
                    }
                    
                    if(json["employees"] != nil){
                        company.employees = json["employees"].int
                    }
                    
                    if(json["logoUrl"] != nil){
                        company.logoUrl = json["logoUrl"].string
                    }
                    
                    if(json["bannerUrl"] != nil){
                        company.bannerUrl = json["bannerUrl"].string
                    }
                    
                    if(json["_id"] != nil){
                        company.id = json["_id"].string
                    }
                    
                    
                    // This should also update our local list of companies
                    completionHandler(company, nil)
                }
            case .Failure(let error):
                completionHandler(nil, error)
            }
        }
    }
    
    func getEvent(id:String, completionHandler: (Event?, NSError?) -> ()) {
        Alamofire.request(.GET, NSURL(string: "\(baseURL)/api/events/\(id)")!).validate().responseJSON { response in
            switch response.result {
            case .Success:
                if let value = response.result.value {
                    let json = JSON(value)
                    var event:Event = Event()
                    
                    if(json["name"] != nil){
                        event.name = json["name"].string
                    }
                    
                    if(json["info"] != nil){
                        event.info = json["info"].string
                    }
                    
                    if(json["location"] != nil){
                        event.location = json["location"].string
                    }
                    
                    if(json["startDate"] != nil){
                        if let date = self.stringToDate(json["startDate"].string!) {
                            event.startDate = date
                        }
                    }
                    
                    if(json["endDate"] != nil){
                        if let date = self.stringToDate(json["endDate"].string!) {
                            event.endDate = date
                        }
                    }
                    
                    if(json["registrationRequired"] != nil){
                        event.registrationReguired = json["registrationRequired"].bool
                    }
                    
                    if(json["registrationStartDate"] != nil){
                        if let date = self.stringToDate(json["registrationStartDate"].string!) {
                            event.registrationStartDate = date
                        }
                    }
                    
                    if(json["registrationEndDate"] != nil){
                        if let date = self.stringToDate(json["registrationEndDate"].string!) {
                            event.registrationEndDate = date
                        }
                    }
                    
                    if(json["registrationUrl"] != nil){
                        event.registrationUrl = json["registrationUrl"].string
                    }
                    
                    if(json["imageUrl"] != nil) {
                        event.imageUrl = json["imageUrl"].string
                    }
                    
                    if(json["_id"] != nil){
                        event.id = json["_id"].string
                    }
                    
                    
                    // This should also update our local list of companies
                    completionHandler(event, nil)
                }
            case .Failure(let error):
                completionHandler(nil, error)
            }
        }
    }
    
    func getEvents(completionHandler: ([Event]?, NSError?) -> ()) {
        Alamofire.request(.GET, NSURL(string: "\(baseURL)/api/events")!).validate().responseJSON { response in
            switch response.result {
            case .Success:
                if let value = response.result.value {
                    let json = JSON(value)
                    var events:[Event] = []
                    
                    
                    for (_, json):(String, JSON) in json {
                        var event:Event = Event()
                        
                        if(json["name"] != nil){
                            event.name = json["name"].string
                        }
                        
                        if(json["startDate"] != nil){
                            if let date = self.stringToDate(json["startDate"].string!) {
                                event.startDate = date
                            }
                        }
                        
                        if(json["endDate"] != nil){
                            if let date = self.stringToDate(json["endDate"].string!) {
                                event.endDate = date
                            }
                        }
                        
                        if(json["imageUrl"] != nil) {
                            event.imageUrl = json["imageUrl"].string
                        }
                        
                        if(json["_id"] != nil){
                            event.id = json["_id"].string
                        }
                        
                        events.append(event)
                    }
                    
                    completionHandler(events, nil)
                }
            case .Failure(let error):
                completionHandler(nil, error)
            }
        }
        
    }
    
    func getPersonnel() -> [Person]? {
        let personnel = [
            Person(name: "Oscar Alsing", group: "Project Manager", imageUrl: "http://armada.nu/system/organisation_members/313/pictures/original/original.jpg", id: nil),
            Person(name: "Gustav Frid", group: "Project Manager", imageUrl: "http://armada.nu/system/organisation_members/296/pictures/thumb/thumb.jpg", id: nil),
            Person(name: "Andreas Pålsson", group: "Head of Web and Android", imageUrl: nil, id: nil)
        ]
        
        return personnel
    }
    
    func stringToDate(string:String) -> NSDate? {
        let dateFormatter = NSDateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        if let date:NSDate = dateFormatter.dateFromString(string){
            return date
        }
        return nil
    }
    
    func fetchSettings() -> Settings? {
        var settings:Settings = Settings()
        
        if let url = NSURL(string: "\(baseURL)/api/settings") {
            do {
                let data = NSData(contentsOfURL: url)
                if data != nil {
                    let json = JSON(data: data!)
                    print(json)
                    
                    if json != nil {
                        
                        if(json["primaryColor"] != nil){
                            settings.primaryColor = UIColor(rgba: json["primaryColor"].string!)
                        }
                        
                        if(json["primaryTextColor"] != nil){
                            settings.primaryTextColor = UIColor(rgba: json["primaryTextColor"].string!)
                        }
                        
                        if(json["titleTextColor"] != nil){
                            settings.primaryTextColor = UIColor(rgba: json["titleTextColor"].string!)
                        }
                        
                        if(json["tintColor"] != nil){
                            settings.tintColor = UIColor(rgba: json["tintColor"].string!)
                        }
                        
                        if(json["contentMode"] != nil){
                            switch json["contentMode"] {
                            case "Normal":
                                settings.contentMode = "Dark"
                            default:
                                settings.contentMode = "Light"
                            }
                        }
                        
                        if(json["exhibitorCellHeight"] != nil){
                            settings.exhibitorCellHeight = CGFloat(json["exhibitorCellHeight"].number!)
                        }
                        
                        if(json["tabs"] != nil) {
                            for tab in json["tabs"].arrayValue {
                                if(tab["isActive"].boolValue){
                                    switch tab["name"].stringValue {
                                    case "exhibitor":
                                        settings.exhibitorViewIsActive = true
                                        break
                                    case "event":
                                        settings.eventViewIsActive = true
                                        break
                                    case "partner":
                                        settings.partnerViewIsActive = true
                                        break
                                    case "contact":
                                        settings.contactViewIsActive = true
                                    case "personnel":
                                        settings.personnelViewIsActive = true
                                    default:
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            print("bad url")
        }
        
        return settings
    }
    
    func fetchSettings_asd(completionHandler: (Settings?, NSError?) -> ()) {
         Alamofire.request(.GET, "\(baseURL)/api/settings").validate().responseJSON { response in
            switch response.result {
            case .Success:
                if let value = response.result.value {
                    let json = JSON(value)
                    var settings:Settings = Settings()
                    
                    if(json["primaryColor"] != nil){
                        settings.primaryColor = UIColor(rgba: json["primaryColor"].string!)
                    }
                    
                    if(json["primaryTextColor"] != nil){
                        settings.primaryTextColor = UIColor(rgba: json["primaryTextColor"].string!)
                    }
                    
                    if(json["titleTextColor"] != nil){
                        settings.primaryTextColor = UIColor(rgba: json["titleTextColor"].string!)
                    }
                    
                    if(json["tintColor"] != nil){
                        settings.tintColor = UIColor(rgba: json["tintColor"].string!)
                    }
                    
                    if(json["contentMode"] != nil){
                        switch json["contentMode"] {
                            case "Normal":
                            settings.contentMode = "Dark"
                            default:
                            settings.contentMode = "Light"
                        }
                    }
                    
                    if(json["exhibitorCellHeight"] != nil){
                        settings.exhibitorCellHeight = CGFloat(json["exhibitorCellHeight"].number!)
                    }
                    
                    if(json["tabs"] != nil) {
                        settings.exhibitorViewIsActive = true
                        settings.eventViewIsActive = false
                        settings.partnerViewIsActive = false
                        settings.contactViewIsActive = false
                        settings.personnelViewIsActive = false
                        
                        settings.exhibitorViewTitle = "Exhibitors"
                        settings.eventViewTitle = "Events"
                        settings.partnerViewTitle = "Partners"
                        settings.contactViewTitle = "Contact"
                        settings.personnelViewTitle = "Personnel"
                    }
                    
                    // This should also update our local list of companies
                    completionHandler(settings, nil)
                }
            case .Failure(let error):
                completionHandler(nil, error)
            }

         }

    }
    
    func getSettings() -> Settings? {
        if let settings = self.settings {
            return settings
        } else {
            self.settings = fetchSettings()
            print(self.settings)
            return self.settings
        }
    }
}

let dataFactory = DataFactory()