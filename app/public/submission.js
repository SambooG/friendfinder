function submitData(){
    const answersCollection = $(".form-control");
    const answers = [...answersCollection];
    const submission = { scores: [] };
    answers.forEach(function(item){
        const id = item.id;
        const idAsNumber = Number(id);
        const isTheIdANumber = !Number.isNaN(idAsNumber);
        if (isTheIdANumber) {
            submission.scores[idAsNumber] = item.value
        }
        else {
            submission[id] = item.value;
        }
    });
    console.log(submission, answers);
    $.ajax({
        type:"POST",
        url: "/api/friends",
        data: submission,
        success: function(result) {
          console.log("success!!:", result);
      }
    })
}


$("#submit").click(function() {
    submitData();
});



/* 

 const forEach = (customFn) => {
    for (let i = 0; i < someArray.length; i += 1) {
        customFn(someArray[i]);
    }
 }

*/