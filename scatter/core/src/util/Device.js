import DeviceUUID from './device-uuid';

let device;

if (typeof navigator === 'undefined'){
	device = 'nodejs_env'
} else {
	const du = new DeviceUUID().parse(navigator.userAgent);
	const dua = [
		du.language,
		du.platform,
		du.os,
		du.cpuCores,
		du.colorDepth,
	];
	device = du.hashMD5(dua.join(':'));
}

export default device;