document.addEventListener("DOMContentLoaded", function () {
    const resetBtn = document.getElementById("reset-btn");
    const inputs = document.querySelectorAll("input");
    const form = document.getElementById("login-form");
    const banner = document.getElementById("moving-banner");

    const facts = [
        "Octopuses have three hearts!",
        "Honey never spoils!",
        "A day on Venus is longer than a year!",
        "Wombat poop is cube-shaped!",
        "Sloths can hold their breath longer than dolphins!",
        "Sharks existed before trees!",
        "You can't hum while holding your nose!",
        "Butterflies taste with their feet!",
        "There's an island within a lake on an island within a lake!",
        "There's no number from 1-999 that has the letter 'a' in it!",
        "Bananas are radioactive!",
        "Cows have best friends!",
        "A shrimp's heart is in its head!",
        "Water can boil and freeze at the same time!",
        "Rabbits can't puke!",
        "A group of flamingos is called a flamboyance!",
        "A single spaghetti noodle is called a spaghetto!",
        "There's a species of jellyfish that is immortal!",
        "Snails can sleep for three years!",
        "Koalas' fingerprints are nearly identical to humans!",
        "A cloud can weigh over a million pounds!",
        "There's a fish that can climb waterfalls!",
        "The Eiffel Tower grows in summer!",
        "Cows moo with accents!",
        "Penguins propose to their mates with pebbles!"
    ];

    function randomizeResetButton() {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        resetBtn.style.left = `${x}px`;
        resetBtn.style.top = `${y}px`;
    }

    randomizeResetButton();
    setInterval(randomizeResetButton, 3000);

    // Reset button clears all input fields
    resetBtn.addEventListener("click", function () {
        inputs.forEach(input => input.value = "");
    });

    // Block the backspace key to prevent manual corrections
    document.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
            event.preventDefault(); // Disable backspace completely
        }
    });

    form.addEventListener("submit", function (event) {
        const email = document.getElementById("email").value;
        const age = document.getElementById("age").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const terms = document.getElementById("terms");
        const andCheck = document.getElementById("and");
        const conditions = document.getElementById("conditions");

        const usernameRules = [
            "must contain an emoji",
            "must include an animal name",
            "must be at least 12 characters",
            "must have a number",
            "must start with a capital letter"
        ];

        const passwordRules = [
            "must include a Greek letter",
            "must contain at least one punctuation mark",
            "must be exactly 8 characters long",
            "must not contain numbers",
            "must contain a palindrome"
        ];

        let errors = [];

        if (!/^[a-zA-Z]+at[a-zA-Z]+dotcom$/.test(email)) {
            errors.push("Your email must be written as 'nameatemaildotcom'.");
        }

        if (!/^[IVXLCDM]+$/.test(age)) {
            errors.push("Your age must be entered in Roman numerals.");
        }

        const failedUsernameRule = usernameRules.find(rule => !checkUsername(username, rule));
        if (failedUsernameRule) {
            errors.push("Your username " + failedUsernameRule + ".");
        }

        const failedPasswordRule = passwordRules.find(rule => !checkPassword(password, rule));
        if (failedPasswordRule) {
            errors.push("Your password " + failedPasswordRule + ".");
        }

        if (!(terms.checked && andCheck.checked && conditions.checked)) {
            errors.push("You must check 'Terms and Conditions' in order.");
        } else if (!terms.checked || andCheck.checked && !conditions.checked) {
            errors.push("Check the boxes in order: 'Terms' → 'and' → 'Conditions'.");
        }

        if (errors.length > 0) {
            alert(errors[Math.floor(Math.random() * errors.length)]);
            event.preventDefault();
        } else {
            // Display frustrating success message
            document.body.innerHTML = "<h1 style='text-align:center; font-family:sans-serif; margin-top:20%; color: red;'>Congrats, you successfully wasted a lot of time!</h1>";
            event.preventDefault();
        }
    });

    function updateBanner() {
        banner.innerText = "Random Fact: " + facts[Math.floor(Math.random() * facts.length)];
    }

    setInterval(updateBanner, 4000);
    updateBanner();

    function checkUsername(username, rule) {
        switch (rule) {
            case "must contain an emoji": return /[\u{1F600}-\u{1F64F}]/u.test(username);
            case "must include an animal name": return /(dog|cat|lion|tiger|elephant)/i.test(username);
            case "must be at least 12 characters": return username.length >= 12;
            case "must have a number": return /\d/.test(username);
            case "must start with a capital letter": return /^[A-Z]/.test(username);
            default: return true;
        }
    }

    function checkPassword(password, rule) {
        switch (rule) {
            case "must include a Greek letter": return /[α-ωΑ-Ω]/.test(password);
            case "must contain at least one punctuation mark": return /[.,!?;:]/.test(password);
            case "must be exactly 8 characters long": return password.length === 8;
            case "must not contain numbers": return !/\d/.test(password);
            case "must contain a palindrome": return isPalindrome(password);
            default: return true;
        }
    }

    function isPalindrome(str) {
        const cleanStr = str.toLowerCase().replace(/[^a-z]/g, "");
        return cleanStr === cleanStr.split("").reverse().join("");
    }
});

