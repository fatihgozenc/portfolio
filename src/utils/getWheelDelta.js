// I need this because of cross-browser functionality

const getWheelDelta = (e) => {
	return e.wheelDelta
		|| -e.detail
		|| e.originalEvent.wheelDelta
		|| -e.originalEvent.detail
		|| -(e.originalEvent.deltaY * 25)
		|| null;
}

export default getWheelDelta