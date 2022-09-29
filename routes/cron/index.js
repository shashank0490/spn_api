const CronJob = require('cron').CronJob;
// const VillageCertificate = require('../../services/villageWiseLatLog');
new CronJob("0 */3 * * *", async () => {
    let condition = { "approve_status": "2", "village_certificate": { $eq: null } }
    sequelize.transaction().then((t) => {
        // VillageCertificate.villagePdf(t, condition, (data) => {
        //     if (data.success) {
        //         console.log("Sucessfully certificate updated")
        //     } else {
        //         console.log(data.message)
        //     }
        // });
    })
}, null, true, 'Asia/Kolkata').start();