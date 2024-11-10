const fs = require("fs");

/**
 * Task to replace app id and service
 * @param {object} parameters Parameters
 * @param {module:@ui5/logger/Logger} parameters.log Logger instance
 * @param {module:@ui5/fs.DuplexCollection} parameters.workspace DuplexCollection to read and write files
 * @param {object} parameters.options Options
 * @returns {Promise<undefined>} Promise resolving with undefined once data has been written
 */
module.exports = async ({ log, workspace, options }) => {
	// disable task if no replacer is configured
	if (!options?.configuration?.replacer) {
		return Promise.resolve();
	}
	log.info("Start replacer with configuration: " + options?.configuration?.replacer);

	// determine the copyright and current year placeholders
	let oConfig = Object.assign({}, options.configuration);
	log.verbose("Config: " + JSON.stringify(oConfig));

	// process the script resources
	const scriptResources = await workspace.byGlob(`**/*.+(ts|js)`);
	if (scriptResources.length > 0) {
		await Promise.all(
			scriptResources.map(async (resource) => {
				const resourcePath = resource.getPath();
				// detailed logging
				log.verbose("Processing file " + resourcePath);

				// read the resource and parse the code
				let code = await resource.getString();
                oConfig.replacer.forEach(element => {
					code = code.replaceAll(element.from, element.to);
                });
				await resource.setString(code);
				// write the resource
				await workspace.write(resource);
			})
		);
	}

	// process the xml resources
	const xmlResources = await workspace.byGlob(`**/*.+(xml|html|library)`);
	if (xmlResources.length > 0) {
		await Promise.all(
			xmlResources.map(async (resource) => {
				const resourcePath = resource.getPath();
				// detailed logging
				log.verbose("Processing file " + resourcePath);

				// read the resource and parse the code
				let code = await resource.getString();
                oConfig.replacer.forEach(element => {
					code = code.replaceAll(element.from, element.to);
                });
				await resource.setString(code);
				
				// write the resource
				await workspace.write(resource);
			})
		);
	}

    // process the json resources
	const jsonResources = await workspace.byGlob(`**/*.json`);
	if (jsonResources.length > 0) {
		await Promise.all(
			jsonResources.map(async (resource) => {
				const resourcePath = resource.getPath();
				// detailed logging
				log.verbose("Processing file " + resourcePath);

				// read the resource and parse the code
				let code = await resource.getString();
                oConfig.replacer.forEach(element => {
					code = code.replaceAll(element.from, element.to);
                });
				await resource.setString(code);
				
				// write the resource
				await workspace.write(resource);
			})
		);
	}
};

/**
 * Callback function to define the list of required dependencies
 * @returns {Promise<Set>}
 *      Promise resolving with a Set containing all dependencies
 *      that should be made available to the task.
 *      UI5 Tooling will ensure that those dependencies have been
 *      built before executing the task.
 */
module.exports.determineRequiredDependencies = async function () {
	return new Set();
};