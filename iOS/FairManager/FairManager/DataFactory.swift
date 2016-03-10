//
//  DataFactory.swift
//  FairManager
//
//  Created by Oscar Alsing on 10/03/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import Foundation
import UIKit

struct Company {
    var name:String
}

public class DataFactory {
    class func getCompanies(completionHandler: ([Company]?, NSError?) -> Void) -> NSURLSessionTask {
        //TODO: This URL should be fetched synchronously from server
        let urlAsString = "http://fairmanager.herokuapp.com/api/companies"
        
        let url = NSURL(string: urlAsString)!
        let urlSession = NSURLSession.sharedSession()
        
        let task = urlSession.dataTaskWithURL(url) { data, response, error -> Void in
            if error != nil {
                completionHandler(nil, error)
                return
            }
            
            var companyArray:[Company] = []
            
            do {
                if let data = data {
                    let jsonArray = try NSJSONSerialization.JSONObjectWithData(data, options:NSJSONReadingOptions(rawValue: 0)) as! NSArray
                    for company in jsonArray {
                        let companyName = company["name"] as! String
                        companyArray.append(Company(name: companyName))
                    }
                    
                    completionHandler(companyArray, nil)
                    return
                }

            } catch let JSONError as NSError{
                completionHandler(nil, JSONError)
                return
            }
        }
        task.resume()
        return task
    }
    
}