const game_btns = document.querySelectorAll('.medium-circle');
const selected_btn = document.getElementById("selected_btn_img");
const robo_selected_btn = document.getElementById("robo_selected_btn_img");
const modal = document.getElementById("myModal");
const modal_text = document.getElementById("modal_text");
const modalContent = document.querySelector(".modal-content");
const winingModal = document.getElementById('wining-modal');
const confetti = document.getElementById('confetti');
const cardmodalContent = document.getElementById('card');
const modal_restart = document.getElementById('restartgm');
const modal_home = document.getElementById('home');
const score_board = document.getElementById('right-rectangle');
const gameresult_modal_text = document.getElementById('gameresult_modal_text');
robo_selected_btn.style.zIndex = "2";

let selected_btn_img = '';
let robo_sel_str = ''.trim();
let you_sel_str = 'stone'.trim();
let win_lose_text = '';
let your_round_score = 0;
let robo_round_score = 0;
let tie_round_score = 0;
let score_bord_div_des = '';
let score_bord_div_des_winner = '';

const homepage = document.getElementById('homepage');
const closeButton = document.querySelector('.close-button');
const modals = document.querySelector('.modal3_homepage');
const how_to_play = document.getElementById('how_to_play');
const start_game_btn = document.getElementById('start_game_btn');
const setting = document.querySelector('.setting');
const setting_menu = document.querySelector('.setting-menu');
let gamePlayPageDisplay = false;
let gameStarted = false; // This flag ensures the game starts only once
const toggleButton = document.getElementById('toggleButton');
const audioPlayer = document.getElementById('audioPlayer');
const iconsong = document.getElementById('play_pause_song_icon');
const loaderhamaster = document.getElementById('loader');
window.addEventListener("load", (event) => {
	var audio = document.getElementById('audioPlayer');
	audio.play();
	loaderhamaster.style.display = 'flex';
	homepage.style.display='none';
	setTimeout(() => {
		loaderhamaster.style.display = 'none';
		homepage.style.display='flex';
	}, 2500);
});

toggleButton.addEventListener('click', () => {
	if (audioPlayer.paused) {
		audioPlayer.play();
		toggleButton.innerHTML = `<img src="musicon.png" alt="musicon">`;
		console.log('play');
	} else {
		audioPlayer.pause();
		toggleButton.innerHTML = `<img src="musicoff.png" alt="musicon">`;
		console.log('paused');
	}
});

       
const gamePlayPage = document.getElementById('game_play_page');
let total_game_round = 5;

// Function to observe display style changes
function observeDisplayChanges() {
    const observer = new MutationObserver(() => {
        if (window.getComputedStyle(gamePlayPage).display !== 'none') {

            gamePlayPageDisplay = true;
            gameStarted = true;  // Ensure the game starts only once
            repeatHandleGameEvents(total_game_round); // Start the game loop
            observer.disconnect();  // Stop observing once the game starts
        }
    });

    observer.observe(gamePlayPage, {
        attributes: true,
        attributeFilter: ['style'], // Observe changes in the style attribute
    });
}

// Call this function when you expect the display to change, for example after clicking the start button
observeDisplayChanges();




start_game_btn.addEventListener('click', () => {
	homepage.style.transform = 'scale(0.2)';
	homepage.style.opacity = '0';
	setTimeout(() => {
		homepage.style.display = "none";
		gamePlayPage.style.display = 'contents';
        score_bord_div_des = '';
        score_bord_div_des_winner = '';
        your_round_score = 0;
        robo_round_score = 0;
        tie_round_score = 0;
        hideWinningModal();
	    // repeatHandleGameEvents(total_game_round);
		// setInterval(() => {
		// 	observeDisplayChanges();
		// }, 100);
		console.log(gamePlayPage.style.display);
		observeDisplayChanges();
	}, 500);

	
	
});

setting.addEventListener('click', () => {
	setting_menu.classList.toggle('visiable');
})

how_to_play.addEventListener('click', () => {
	showhowtoplaymodal();
});
closeButton.addEventListener('click', () => {
	document.body.classList.remove('show-modal2');
	modals.style.display = 'none';
});

function selectRound(button) {
	const buttons = document.querySelectorAll('.btn_homepage');
	buttons.forEach(btn => btn.classList.remove('selected'));
	button.classList.add('selected');
	total_game_round = parseInt(button.innerText);
	console.log(button.innerText);
}


function showhowtoplaymodal() {
	var modal = document.getElementById("myModal2");
	modal.style.display = "block";
	modals.style.display = 'block';
}

function handleClick(event) {
	const btn = event.currentTarget; // Get the clicked button
	game_btns.forEach((c) => {
		c.classList.remove('selected_btn');
	});
	btn.classList.add('selected_btn');
	selected_btn_img = btn.querySelector('img').src;
	selected_btn.innerHTML = `<img src="${selected_btn_img}" alt="Stone">`;
	let url = selected_btn_img.replace('.png', '').toLowerCase();
	you_sel_str = url.split("/").pop();
	console.log(selected_btn_img);
}

game_btns.forEach((btn) => {
	btn.addEventListener('click', handleClick);
});



function showmodal() {
	modal.style.display = "block";
	modal_text.innerText = `${win_lose_text} this round`;
	setTimeout(() => {
		modalContent.classList.add("show");
		setTimeout(() => {
			closeModal();
		}, 1500);
	}, 10);
}

function closeModal() {
	modalContent.classList.remove("show");
	modalContent.classList.add("hide");
	robo_selected_btn.innerHTML = '';
	game_btns.forEach((btn) => {
		btn.addEventListener('click', handleClick);
		btn.style.cursor = "pointer";
	});
	setTimeout(() => {
		modal.style.display = "none";
		modalContent.classList.remove("hide");
		score_board.innerHTML = `${score_bord_div_des_winner} ${score_bord_div_des}`;

	}, 500);

	//score_board.innerHTML = `${score_bord_div_des_winner} ${score_bord_div_des}`;
}

function showWinningModal(dis) {
	winingModal.style.display = "flex";
	confetti.style.display = dis;
	setTimeout(() => {
		cardmodalContent.classList.add("show");
	}, 10);
}

function hideWinningModal() {
	const winingModal = document.getElementById('wining-modal');
	const cardmodalContent = document.getElementById('card');
	cardmodalContent.classList.remove("show");
	cardmodalContent.classList.add("hide");
	setTimeout(() => {
		winingModal.style.display = "none";
		confetti.style.display = "none";
		cardmodalContent.classList.remove("hide");
	}, 500);
}

modal_home.addEventListener('click', () => {
	hideWinningModal();
	gamePlayPage.style.transform = 'scale(0.2)';
	homepage.style.transform = 'scale(0.2)';
	gamePlayPage.style.opacity = '0';
	setTimeout(() => {
        homepage.style.transform='scale(1)';
		homepage.style.display = "flex";
		homepage.style.opacity = "1";
		gamePlayPage.style.display = 'none';
		console.log(gamePlayPage.style.display);
	}, 500);
	
});

modal_restart.addEventListener('click', () => {
	score_bord_div_des = '';
	score_bord_div_des_winner = '';
	your_round_score = 0;
	robo_round_score = 0;
	tie_round_score = 0;
	hideWinningModal();
	repeatHandleGameEvents(total_game_round);
	console.log(gamePlayPage.style.display);
	// observeDisplayChanges();
});
let gameCount = 0;

function handleGameEvents(gettimesn) {
    console.log('its starting')
	let rndomNum = 1;

	function getrandomNum() {
		rndomNum = Math.floor(Math.random() * 3) + 1;
		return rndomNum;
	}

	getrandomNum();
	let score_bord_div_des = '';
	for (let index = 0; index < gettimesn; index++) {
		score_bord_div_des = score_bord_div_des + `<div class="who_win_circle c1"></div>`;
		score_board.innerHTML = `${score_bord_div_des_winner} ${score_bord_div_des}`;
	}

	if (rndomNum === 1) {
		robo_selected_btn.innerHTML = `<img src="Stone.png" alt="Stone" class="robo_sel_img">`;
		robo_sel_str = "stone";
	} else if (rndomNum === 2) {
		robo_selected_btn.innerHTML = `<img src="Paper.png" alt="Stone" class="robo_sel_img">`;
		robo_sel_str = "paper";
	} else if (rndomNum === 3) {
		robo_selected_btn.innerHTML = `<img src="Siccor.png" alt="Stone" class="robo_sel_img">`;
		robo_sel_str = "siccor";
	} else {
		console.log("error");
	}


	// Reset the timer before each round
	let time = 5; // Set your desired countdown start value here
	document.getElementById('time_of_round').innerHTML = time;

	let countdown = setInterval(() => {
		time--;
		document.getElementById('time_of_round').innerHTML = time;
		if (time === 0) {
			// Display 0 and then clear the interval
			document.getElementById('time_of_round').innerHTML = "0";
			clearInterval(countdown);

			game_btns.forEach((btn) => {
				btn.removeEventListener('click', handleClick);
				btn.style.cursor = "not-allowed";
			});

			document.querySelector('.robo_sel_img').style.display = "flex";

			// Win/lose logic
			if (robo_sel_str == 'stone' && you_sel_str == 'stone') {
				win_lose_text = "tie";
				tie_round_score = tie_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="Tie.png" alt="robo" id="robologo"></div>`;
			} else if (robo_sel_str == 'stone' && you_sel_str == 'paper') {
				win_lose_text = "you win";
				your_round_score = your_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="yourlogo2.png" alt="robo"></div>`;
			} else if (robo_sel_str == 'stone' && you_sel_str == 'siccor') {
				win_lose_text = "you lost";
				robo_round_score = robo_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="Robo.png" alt="robo"></div>`;
			} else if (robo_sel_str == 'paper' && you_sel_str == 'stone') {
				win_lose_text = "you lost";
				robo_round_score = robo_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="Robo.png" alt="robo"></div>`;
			} else if (robo_sel_str == 'paper' && you_sel_str == 'paper') {
				win_lose_text = "tie";
				tie_round_score = tie_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="Tie.png" alt="robo" id="robologo"></div>`;
			} else if (robo_sel_str == 'paper' && you_sel_str == 'siccor') {
				win_lose_text = "you win";
				your_round_score = your_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="yourlogo2.png" alt="robo"></div>`;
			} else if (robo_sel_str == 'siccor' && you_sel_str == 'stone') {
				win_lose_text = "you win";
				your_round_score = your_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="yourlogo2.png" alt="robo"></div>`;
			} else if (robo_sel_str == 'siccor' && you_sel_str == 'paper') {
				win_lose_text = "you lost";
				robo_round_score = robo_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="Robo.png" alt="robo"></div>`;
			} else if (robo_sel_str == 'siccor' && you_sel_str == 'siccor') {
				win_lose_text = "tie";
				tie_round_score = tie_round_score + 1;
				score_bord_div_des_winner = score_bord_div_des_winner + `<div class="who_win_circle c1"><img src="Tie.png" alt="robo" id="robologo"></div>`;
			} else {
				console.log("error");
			}

			setTimeout(() => {
				showmodal();
			}, 2000);
		}
	}, 1000);
}


function repeatHandleGameEvents(timesn) {
	if (timesn > 0) {
		handleGameEvents(timesn); // Run the game event
		setTimeout(() => {
			repeatHandleGameEvents(timesn - 1); // Recursively call the function for the next round
		}, 9500); // Adjust the delay to match the duration of your game event (4 seconds for this example)
	} else {
		console.log("Game sequence completed.");
		console.log("your score: " + your_round_score);
		console.log("robo score: " + robo_round_score);
		console.log("tie score: " + tie_round_score);

		if (your_round_score > robo_round_score) {
			gameresult_modal_text.innerText = `You Win This Game Your Score Is: ${your_round_score} Out Of ${total_game_round}`
			const dis = "flex";
			showWinningModal(dis);
		} else if (your_round_score < robo_round_score) {
			gameresult_modal_text.innerText = `You Lost This Game Your Score Is: ${your_round_score} Out Of ${total_game_round}`;
			const dis = "none";
			showWinningModal(dis);
		} else {
			gameresult_modal_text.innerText = 'Tie This Game';
			const dis = "flex";
			showWinningModal(dis);
		}
	}
}
