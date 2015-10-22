angular.module('dbService', ['ngCordova'])

.factory('Database', function($cordovaSQLite) {
	var db = null;

	function dbCopy() {
		window.plugins.sqlDB.copy("zip.db", function() {
			db = $cordovaSQLite.openDB("cities.db");
		}, function(error) {
			console.error("There was an error copying the database: " + error);
			db = $cordovaSQLite.openDB("zip.db");
		});
	}

    function selectAll() {
	    var db = $cordovaSQLite.openDB("zip.db");
	    var query = "SELECT state FROM cities LIMIT 10";
	    $cordovaSQLite.execute(db, query, []).then(function(res) {
	        if(res.rows.length > 0) {
	            for(var i = 0; i < res.rows.length; i++) {
	                console.log("SELECTED -> " + res.rows.item(i).firstname + " " + res.rows.item(i).lastname);
	            }
	            var rows = res;
	            return rows;
	        } else {
	            console.log("No results found");
	        }
	    }, function (err) {
	        console.error(err);
	    });
	}

	return {
		sqlCopy: function() {
			return dbCopy();
		},
		fetchAll: function() {
			return selectAll();
		}
	};
});