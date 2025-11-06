const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js");
const User = require("./user.js");

const Project = sequelize.define("Project", {
    id_project: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    repository: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: "id_user" },
        onDelete: "CASCADE",
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

Project.belongsTo(User, { foreignKey: "created_by", onDelete: "CASCADE" });

module.exports = Project;
