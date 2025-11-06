const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js");
const User = require("./user.js");
const Project = require("./project.js");

const ProjectMember = sequelize.define("ProjectMember", {
    id_user: {
        type: DataTypes.UUID,
        references: { model: User, key: "id_user" },
        primaryKey: true,
        allowNull: false,
        onDelete: "CASCADE",
    },
    id_project: {
        type: DataTypes.UUID,
        references: { model: Project, key: "id_project" },
        primaryKey: true,
        allowNull: false,
        onDelete: "CASCADE",
    },
    role: {
        type: DataTypes.ENUM("PM", "TST"), // Membru proiect sau tester
        allowNull: false,
        defaultValue: "TST",
    },
}, {
    timestamps: false,
});

module.exports = ProjectMember;
