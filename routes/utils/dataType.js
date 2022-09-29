const Sequelize = require("sequelize");

module.exports.getDataType = (type, length) => {
    type = type.split(/\(([^]+)\)/);
    type[1] ? (length = type[1]) : "";
    switch (type[0].toLowerCase()) {
        case "string":
            return Sequelize.STRING(length || 255);
        case "text":
            return Sequelize.TEXT;
        case "int":
            return Sequelize.INTEGER;
        case "tinyint":
            return Sequelize.TINYINT;
        case "date":
            return Sequelize.DATEONLY;
        case "datetime":
            return Sequelize.DATE;
        case "timestamp":
            return "TIMESTAMP";
        default:
            return Sequelize.STRING(length || 255);
    }
}