#pragma strict

var val :float = 1.0;

function Start () {

}

function Update () {
	transform.Rotate( Vector3(0.0, val, 0.0), Space.Self
		);
	
	Debug.Log("Rotate Speed is:" + val );

}