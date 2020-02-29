const environment = {};
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development'){
    environment.databaseHost = 'localhost';
    environment.databasePort = 5432;
    environment.databaseName = 'smart';
    environment.databaseUsername = '';
    environment.databasePassword = '';
} else {
    environment.databaseHost = "ec2-54-195-247-108.eu-west-1.compute.amazonaws.com";
    environment.databasePort = 5432;
    environment.databaseSmart = "d39mg6n0e9eg9v";
    environment.databaseUsername = process.env.DATABASE_USERNAME;
    environment.databasePassword = process.env.DATABASE_PASSWORD;
}

module.exports={
    environment
};