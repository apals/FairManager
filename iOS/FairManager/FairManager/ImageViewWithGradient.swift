import UIKit
import AVFoundation


class ImageViewWithGradient: UIImageView
{
    let myGradientLayer: CAGradientLayer
    
    override init(frame: CGRect)
    {
        myGradientLayer = CAGradientLayer()
        super.init(frame: frame)
        self.setup()
    }
    
    required init(coder aDecoder: NSCoder)
    {
        myGradientLayer = CAGradientLayer()
        super.init(coder: aDecoder)!
        self.setup()
    }
    
    func setup()
    {
        myGradientLayer.startPoint = CGPoint(x: 0, y: 0)
        myGradientLayer.endPoint = CGPoint(x: 0, y: 1)
        let colors: [CGColorRef] = [
            UIColor.clearColor().CGColor,
            UIColor(red: 0, green: 0, blue: 0, alpha: 0.5).CGColor
        ]
        myGradientLayer.colors = colors
        myGradientLayer.opaque = false
        myGradientLayer.locations = [0.6, 1]
        self.layer.addSublayer(myGradientLayer)
    }
    
    override func layoutSubviews()
    {
        myGradientLayer.frame = self.layer.bounds
    }
}