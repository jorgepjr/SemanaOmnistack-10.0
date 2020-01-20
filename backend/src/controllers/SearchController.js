const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');


module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;

        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },

            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                },
            },
        });

        return res.json({ devs });
    }
}