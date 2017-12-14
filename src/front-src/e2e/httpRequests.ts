import { browser, by, element, protractor } from 'protractor';


let headers = {};


export function setToken(token) {
	headers['x-access-token'] = token;
}

export function getRequest(siteUrl) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'GET', json: true, headers: headers }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
			"body": response.body
		});
	});
	return defer.promise;
}


export function deleteRequest(siteUrl) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'DELETE', json: true, headers: headers }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode
		});
	});
	return defer.promise;
}



export function postRequest(siteUrl, data) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'POST', json: true, body: data, headers: headers }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
			"body": response.body
		});
	});
	return defer.promise;
}


export function patchRequest(siteUrl, data) {
	var request = require('request');
	var defer = protractor.promise.defer();
	request({ uri: siteUrl, method: 'PATCH', json: true, body: data, headers: headers }, function(error, response) {
		defer.fulfill({
			"status": response.statusCode,
			"body": response.body
		});
	});
	return defer.promise;
}
