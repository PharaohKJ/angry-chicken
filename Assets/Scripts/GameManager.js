#pragma strict

var sound : AudioClip;
var bGameOver : boolean;
var bgm : AudioSource;
var sleepThreashold : float = 0.01;
var isTargetAllSleeping : boolean;

function Start () {
	Debug.Log("Game Start");
}


function Update () {
	if(!bGameOver && IsAllTargetDestroyed()) {
		bGameOver = true;
		StartCoroutine(DoGameClear());
	}
}

function StartGameOverCheck() {
	StartCoroutine(DoCheckGameOver());
}

function DoCheckGameOver() {

	yield WaitForSeconds(5.0);
	
	while(!IsTargetAllSleeping()) {
		yield WaitForSeconds(1.0);
	}

	if(!IsAllTargetDestroyed()) {
		bGameOver = true;
		DoGameFailed();		
	}
}

function IsAllTargetDestroyed() {
	var go : GameObject[] = GameObject.FindGameObjectsWithTag ("Target");
	
	if(go.length == 0) {
		Debug.Log("Game Clear");
		return true;
	} else {
		return false;
	}
}

function IsTargetAllSleeping () {
	var rigidbodys : Rigidbody[] = FindObjectsOfType(Rigidbody) as Rigidbody[];
    for (var rb : Rigidbody in rigidbodys) {
    	if( rb.gameObject.tag == "Target") {
        	if ( rb.IsSleeping() == false ) {
        		Debug.Log(rb.gameObject.name + " is awake:" + rb.velocity.magnitude );
        		if( sleepThreashold >= rb.velocity.magnitude ) {
        			rb.Sleep();
        		} else {
        			return false;
        		}
        	}
    	}
    }
    isTargetAllSleeping = true;
    return true;
}

function DoGameFailed() {
	Application.LoadLevel(Application.loadedLevel);
}

function DoGameClear() {
	
	yield WaitForSeconds(1.0);
	
	bgm.Stop();

	audio.PlayOneShot(sound);
	
	yield WaitForSeconds(3.0);

	Application.LoadLevel("GameClear");
}
