#pragma strict

@script ExecuteInEditMode()

var buttonArea : Rect = Rect(10,10,100,10);
var started : boolean;

function OnGUI () {
	
	var btnRect = buttonArea;
	btnRect.x = (Screen.width  - buttonArea.width)  / 2.0 + buttonArea.x;
	btnRect.y = (Screen.height - buttonArea.height) / 2.0 + buttonArea.y;
	
	if( !started ) {
		if (GUI.Button(btnRect,"Start")) {
			Debug.Log("Start!");
			started = true;
			StartCoroutine(DoGameStart());
		}
	}
}

function DoGameStart() {
	audio.Play();
	yield WaitForSeconds(1.0);
	Application.LoadLevel("GameScene1");	
}
