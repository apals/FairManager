//
//  FMPersonnelDetailViewController.swift
//  FairManager
//
//  Created by Oscar Alsing on 22/04/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit

class FMPersonnelDetailViewController: UIViewController {
    var person:Person?
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var groupLabel: UILabel!
    @IBOutlet weak var image: UIImageView!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupPerson()
        

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func setPerson(person:Person) {
        self.person = person
    }
    
    private func setupPerson() {
        if let person = self.person {
            if let name = person.name {
                self.navigationItem.title = name
                self.nameLabel.text = name
            }
            if let group = person.group {
                self.groupLabel.text = group
            }
        }
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
