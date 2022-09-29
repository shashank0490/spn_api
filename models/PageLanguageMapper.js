/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-26
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-26
 * Creating a table named page_language_mapper
 */

module.exports = (sequelize, type) => {
    const pagelangMapper = sequelize.define('page_language_mapper', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pageId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of Page'
        },
        languageId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of Language'
        },
        fields: {
            type: type.JSON,
            comment: 'Fields of pages'
        },
        isActive: {
            type: type.ENUM('0', '1'),
            defaultValue: '1',
            comment: `1: Active 0 : Deactive`
        }
    }, { freezeTableName: true, timestamps: false });
    pagelangMapper.associate = (models) => {
        pagelangMapper.belongsTo(models.page, { foreignKey: 'pageId', as: 'page' })
        pagelangMapper.belongsTo(models.language, { foreignKey: 'languageId', as: 'language' })
    };
    return pagelangMapper;
};
