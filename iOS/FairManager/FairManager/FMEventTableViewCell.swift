//
//  FMEventTableViewCell.swift
//  FairManager
//
//  Created by Oscar Alsing on 10/04/16.
//  Copyright © 2016 Oscar Alsing. All rights reserved.
//

import UIKit

class FMEventTableViewCell: UITableViewCell {
    @IBOutlet weak var topLine: UIView!
    @IBOutlet weak var bottomLine: UIView!
    @IBOutlet weak var middleLine: UIView!
    @IBOutlet weak var dateTextLabel: UILabel!
    @IBOutlet weak var monthTextLabel: UILabel!
    @IBOutlet weak var eventImage: UIImageView!
    @IBOutlet weak var eventNameLabel: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        self.separatorInset = UIEdgeInsetsMake(0, 0, 0, 0) // removes separator
        // Initialization code
        if let settings = dataFactory.getSettings() {
            dateTextLabel.textColor = UIColor.lightGrayColor()
            monthTextLabel.textColor = UIColor.lightGrayColor()
            topLine.backgroundColor = settings.primaryColor
            middleLine.backgroundColor = settings.primaryColor
            bottomLine.backgroundColor = settings.primaryColor
        }
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
