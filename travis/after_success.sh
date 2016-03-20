git config --global user.email "apals@kth.se"
git config --global user.name "Andreas Pålsson"
echo "Host heroku.com" >> ~/.ssh/config
echo "   StrictHostKeyChecking no" >> ~/.ssh/config
echo "   CheckHostIP no" >> ~/.ssh/config; 
echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config;
if [[ $TRAVIS_PULL_REQUEST == "false" && $TRAVIS_BRANCH == "master" ]]
then 
    wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
    heroku keys:clear
    echo yes | heroku keys:add
    grunt build
    echo yes | grunt buildcontrol:heroku
    heroku keys:clear
fi
if [[ $TRAVIS_PULL_REQUEST == "false" ]]
then
    echo $TRAVIS_BRANCH
fi
echo
echo "...done."
