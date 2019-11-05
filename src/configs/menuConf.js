import editorStore from '../store';

export default [
	{
		title : '文件',
		items : [
			{
				title : '新建',
				click : function(event){
					return event;
				}
			},
			{
				title : '打开',
				click : function(){
					editorStore.state.editor.loader.upload();
				}
			},
			{
				title : '保存',
				click : function(){
					editorStore.state.editor.loader.upload();
				}
			},
			{
				title : '另存为',
				click : function(){
					editorStore.state.editor.loader.upload();
				}
			},
			{
				title : '导出',
				click : function(){
					editorStore.state.editor.loader.upload();
				}
			}

		]
	},
	{
		title : '编辑',
		items : [
			{
				title : '上一步',
				click : function(event){
					return event;
				}
			},
			{
				title : '下一步',
				click : function(event){
					return event;
				}
			},
			{
				title : '撤销',
				click : function(event){
					return event;
				}
			}

		]
	},
	{
		title : '操作',
		items : [
			{
				title : '生成uv2',
				click : function(event){
					return event;
				}
			},
			{
				title : '下一步',
				click : function(event){
					return event;
				}
			},
			{
				title : '撤销',
				click : function(event){
					return event;
				}
			}

		]
	},


]