async function generateImage(prompt) {
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
  } catch(error) {
    console.error('图片生成出错:', error);
    alert('图片生成失败,请检查API Key是否正确');
  }
}
$('#run').click(e => {
	var prompt = document.getElementById('prompt').value;
	if (prompt) {
		generateImage(prompt);
	}
});