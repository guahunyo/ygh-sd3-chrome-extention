//-------------------- 右键菜单演示 ------------------------//
chrome.contextMenus.create({
	title: 'YGH', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	id: 'ygh',
});
chrome.contextMenus.create({
	title: 'sd3图片生成', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	parentId: 'ygh',
	id: 'sd3',
	onclick: async function generateImage(params) {
		if (params.selectionText) {
			var prompt = params.selectionText;
			var formData = new FormData();
			formData.append('prompt', prompt);
			formData.append('output_format', 'jpeg');

			try {
				var response = await axios.post('https://api.stability.ai/v2beta/stable-image/generate/sd3',
					formData, {
					headers: {
						'Authorization': '',
						'Accept': 'image/*'
					},
					responseType: 'blob'
				});

				var imageUrl = URL.createObjectURL(response.data);
				document.getElementById('result').src = imageUrl;
			} catch (error) {
				console.error('图片生成出错:', error);
				alert('图片生成失败,请检查API Key是否正确');
			}
		}
	}
});



// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

$('#test_cors').click((e) => {
	$.get('https://www.baidu.com', function (html) {
		console.log(html);
		alert('跨域调用成功！');
	});
});

$('#get_popup_title').click(e => {
	var views = chrome.extension.getViews({ type: 'popup' });
	if (views.length > 0) {
		alert(views[0].document.title);
	} else {
		alert('popup未打开！');
	}
});

// 获取当前选项卡ID
function getCurrentTabId(callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (callback) callback(tabs.length ? tabs[0].id : null);
	});
}

// 当前标签打开某个链接
function openUrlCurrentTab(url) {
	getCurrentTabId(tabId => {
		chrome.tabs.update(tabId, { url: url });
	})
}

// 新标签打开某个链接
function openUrlNewTab(url) {
	chrome.tabs.create({ url: url });
}

// 预留一个方法给popup调用
function testBackground() {
	alert('你好，我是background！');
}

// 是否显示图片
var showImage;
chrome.storage.sync.get({ showImage: true }, function (items) {
	showImage = items.showImage;
});
