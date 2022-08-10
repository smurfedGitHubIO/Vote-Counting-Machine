const fs = require('fs');
const { off } = require('process');

const getvote = async () => {
    fs.readFile('./ballot.txt', 'utf-8', (err, data) => {
        let invalid = false;
        if(err || data == ""){
            console.log("Invalid ballot/Abstain");
            invalid = true;
        }
        const curDate = new Date();
        fs.appendFile('./log.txt', JSON.stringify(curDate) + " " + data + "\n", (err) => {
            if(err){
                console.log(err);
            } else{
                console.log("Success");
            }
        });
        fs.readFile('./votes.json', 'utf-8', (err, data2) => {
            if(err) {
                console.log("Wtf");
            } else {
                let pt = JSON.parse(data2);
                if(invalid) {
                    pt["Abstain/Invalid"] += 1;
                } else{
                    pt[data] += 1;
                }
                const datum = JSON.stringify(pt);
                fs.writeFile('./votes.json', datum, (err) => {
                    if(err){
                        console.log(err);
                    } else{
                        console.log("Goods");
                    }
                });
            }
        });
    });
};

module.exports = getvote;