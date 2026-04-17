// console.log("Hello js for coloie counter");

// // DOM manipulation

const formInput = document.querySelector("form");

formInput.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("input");
  const inputValue = input.value;

  let foodarry = JSON.parse(localStorage.getItem("food")) || [];

  if (inputValue !== "") {
    foodarry.push(inputValue);
  }

  console.log(foodarry);

  localStorage.setItem("food", JSON.stringify(foodarry));

  input.value = "";

  // const btn = document.querySelector("button");  never used

  const divResult = document.querySelector("#resultDiv");

  // coloreieData(inputValue);

  // formInput.classList.add("hidden");
  divResult.classList.remove("hidden");
  renderFoods();
});

function renderFoods() {
  // ⚠️ Clear list first to avoid duplicates when re-rendering

  const showItemList = document.querySelector("#foodItem");

  showItemList.innerHTML = "";

  // console.log(showItemList);

  const getItemsFromLostore = localStorage.getItem("food");

  let NewFood = JSON.parse(getItemsFromLostore) || [];

  NewFood.forEach((foodItem, index) => {
    const li = document.createElement("li");
    // li.textContent = foodItem;
    li.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "pr-2",
      "py-1",
      "w-full",
    );

    //creating span to hold foodItem text
    const span = document.createElement("span");
    span.textContent = `${foodItem}... g`;

    //handle fetched data to rneder

    coloreieData(foodItem, span);

    
    //cretae Delete btn
    const DeleteBtn = document.createElement("button");
    DeleteBtn.textContent = "🗑️";
    DeleteBtn.classList.add("bg-pink-500", "text-white", "px-2", "rounded");

    DeleteBtn.addEventListener("click", () => {
      NewFood.splice(index, 1);

      //UPDATES LOCALSTORAGE
      localStorage.setItem("food", JSON.stringify(NewFood));

      renderFoods();
    });

    //Edit btn

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";

    editBtn.classList.add(
      "bg-yellow-500",
      "text-white",
      "px-2",
      "rounded",
      "mx-2",
    );

    editBtn.addEventListener("click", () => {
      ///input field

      const input = document.createElement("input");
      input.type = "text";
      input.value = foodItem;
      input.classList.add("border", "px-2");
      //  console.log("Clicked")
      // create save btn

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "💾";
      saveBtn.classList.add(
        "bg-green-500",
        "text-white",
        "px-2",
        "rounded",
        "ml-2",
      );
      //replace span with input
      // li.replaceChild(input, span);
        span.replaceWith(input);

      // replace Edit btn with save btn
      // li.replaceChild(saveBtn, editBtn);
       editBtn.replaceWith(saveBtn);

      // =========================
      // 💾 SAVE LOGIC
      // =========================

      saveBtn.addEventListener("click", () => {
        const newValue = input.value.trim();

        if (newValue !== "") {
          NewFood[index] = newValue;

          localStorage.setItem("food", JSON.stringify(NewFood));

          renderFoods();
        }
      });
    });

    //creating another span to hold delete and edit icons

    const span2 = document.createElement("span");
    span2.appendChild(editBtn);
    span2.appendChild(DeleteBtn);
    span2.classList.add("pr-4");

    li.appendChild(span);
    li.appendChild(span2);

    showItemList.appendChild(li);
  });
}

//fetching colorie data

async function coloreieData(inputValue, span) {
  const API_url = `https://api.api-ninjas.com/v1/nutrition?query=${inputValue}`;

  const response = await fetch(API_url, {
    method: "GET",
    headers: {
      "X-Api-Key": "RFU2co6lvB36uZtgt4GOsQofzzr7LSGK6tqrRiOr",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  // console.log(data.fat_total_g);
    if (data.length > 0) {
    span.textContent = `${inputValue} ${data[0].fat_total_g} g`;
  } else {
    span.textContent = `${inputValue} (no data)`;
  }
}
