const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js");
const User = require("./user.js");
const Project = require("./project.js");

const Bug = sequelize.define("Bug", {
    id_bug: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    id_project: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Project, key: "id_project" },
        onDelete: "CASCADE",
    },
    reported_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: "id_user" },
        onDelete: "SET NULL",
    },
    assigned_to: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: User, key: "id_user" },
        onDelete: "SET NULL",
    },
    severity: {
        type: DataTypes.ENUM("low", "medium", "high", "critical"),
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    commit_link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resolved_commit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("open", "in_progress", "resolved", "closed"),
        allowNull: false,
        defaultValue: "open",
    },
    reported_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

Bug.belongsTo(Project, { foreignKey: "id_project", onDelete: "CASCADE" });
Bug.belongsTo(User, { foreignKey: "reported_by", onDelete: "SET NULL" });
Bug.belongsTo(User, { foreignKey: "assigned_to", onDelete: "SET NULL" });

module.exports = Bug;
