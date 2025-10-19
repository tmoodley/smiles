<template>
  <b-container fluid class="bg-lightblue">
    <b-container class="bg-lightblue justify-center">
      <div class="bg-lightblue justify-center">
        <div class="mt-10 min-w-full">
          <div class="rounded-md overflow-hidden shadow-lg bg-white">
            <div class="px-6 py-4">
              <p class="ml-3">General Information</p>
              <p class="text-gray-700 text-base ml-3 mr-3">
                Welcome to Stuttie Virtual Learning. We have received request
                for your tutoring services. Our students would like to know more
                about your tutoring experience. Take few minutes to fill out
                this questionnaire so that we can share it with our students.
              </p>
            </div>
          </div>
        </div>

        <div
          class="p-3 w-3/4 flex justify-center min-w-full"
          :key="'section' + index"
          v-for="(question, index) in evalulationQuestions.sections[
            currentSection
          ].questions"
        >
          <div class="rounded overflow-hidden shadow-lg bg-white min-w-full">
            <div class="px-6 py-4">
              <div class="font-normal text-xl mb-2 ml-3">
                {{ question.question }}
              </div>

              <div v-if="question.questionType == 'DEFAULT'">
                <!-- {{ currentSection }} {{ index }}
              {{
                evaluationAnswers.sections[currentSection].answers[index].answer
              }} -->
                <b-form-input
                  placeholder="Your answer here"
                  class="ml-3"
                  @change="saveResult($event, currentSection, index)"
                  :name="'answer[' + currentSection + '][' + index + ']'"
                  v-model="
                    evaluationAnswers.sections[currentSection].answers[index]
                      .answer
                  "
                  :key="'answer[' + currentSection + '][' + index + ']'"
                ></b-form-input>
              </div>
              <div v-if="question.questionType == 'BOOLEAN'">
                <b-form-group
                  v-slot="{ ariaDescribedby }"
                  v-model="
                    evaluationAnswers.sections[currentSection].answers[index]
                      .answer
                  "
                >
                  <div
                    class=""
                    v-for="(option, index) in question.options"
                    :key="index"
                  >
                    <b-form-radio
                      :aria-describedby="ariaDescribedby"
                      :name="'answer[' + currentSection + '][' + index + ']'"
                      :value="option.value"
                      class="ml-3"
                      :key="'answer[' + currentSection + '][' + index + ']'"
                      >{{ option.text }}</b-form-radio
                    >
                    <!-- <input
                    type="radio"
                    class="width-100 float-left ml-4"
                    placeholder="Enter an answer choice"
                    v-model="option.text"
                    :value="option.value"
                  /> -->
                    <!-- <label :for="option.value" class="form-check-label">{{
                    option.text
                  }}</label> -->
                  </div>
                </b-form-group>
              </div>
              <div v-if="question.questionType == 'MULTI_CHOICE'">
                <div
                  class=""
                  v-for="(option, index) in question.options"
                  :key="index"
                >
                  <!-- <input
                  type="checkbox"
                  class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900
                  sm:text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                  mt-4
                "
                  v-model="option.text"
                  :value="option.value"
                /> -->
                  <b-form-checkbox
                    :id="
                      'answer[' + currentSection + ']option[' + index + ']Id'
                    "
                    v-model="status"
                    :name="
                      'answer[' + currentSection + ']option[' + index + ']'
                    "
                    :value="option.value"
                    unchecked-value="not_accepted"
                    class="ml-3"
                  >
                    {{ option.text }}
                  </b-form-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <b-button
            class="
          
          ml-5
          mr-0
          
        "
            @click="goBack()"
          >
            Back
          </b-button>
          <b-button
            class="
          
          ml-3
          mr-3
          transition-colors
          duration-700
          transform
          bg-indigo-500
          hover:bg-blue-400
          text-gray-100 text-lg
          rounded-lg
          focus:border-4
          border-indigo-300
        "
            @click="goNext()"
          >
            Next
          </b-button>

          <b-button
            class="ml-3
          mr-3"
            >Clear form</b-button
          >
        </div>
      </div>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: "QuestionsView",
  methods: {
    goNext() {
      setTimeout(() => {
        this.currentSection =
          this.currentSection + 1 > 4 ? 4 : this.currentSection + 1;
      }, 200);

      //force reload /rebind the controls
    },
    goBack() {
      setTimeout(() => {
        this.currentSection =
          this.currentSection - 1 < 0 ? 0 : this.currentSection - 1;
      }, 200);
    },
    saveResult(value, section, question) {
      console.log("Event " + JSON.stringify(event)),
        (this.evaluationAnswers.sections[section].answers[
          question
        ].answer = value);
      console.log(JSON.stringify(this.evaluationAnswers));
    }
  },
  data() {
    return {
      currentSection: 0,
      evaluationAnswers: {
        sections: [
          {
            sectionId: "1",
            answers: [
              {
                questionId: 1,
                answer: ""
              },
              {
                questionId: 2,
                answer: ""
              },
              {
                questionId: 3,
                answer: ""
              },
              {
                questionId: 4,
                answer: ""
              },
              { questionId: 5, answer: "" },
              { questionId: 6, answer: "" }
            ]
          },
          {
            sectionId: "2",
            answers: [
              {
                questionId: 1,
                answer: ""
              },
              {
                questionId: 2,
                answer: ""
              },
              {
                questionId: 3,
                answer: ""
              },
              {
                questionId: 4,
                answer: ""
              },
              { questionId: 5, answer: "" },
              { questionId: 6, answer: "" },
              { questionId: 7, answer: "" },
              { questionId: 8, answer: "" },
              { questionId: 9, answer: "" },
              { questionId: 10, answer: "" }
            ]
          },
          {
            sectionId: "3",
            answers: [
              {
                questionId: 1,
                answer: ""
              },
              {
                questionId: 2,
                answer: ""
              },
              {
                questionId: 3,
                answer: ""
              },
              {
                questionId: 4,
                answer: ""
              },
              { questionId: 5, answer: "" },
              { questionId: 6, answer: "" },
              { questionId: 7, answer: "" },
              { questionId: 8, answer: "" }
            ]
          },
          {
            sectionId: "4",
            answers: [
              {
                questionId: 1,
                answer: ""
              },
              {
                questionId: 2,
                answer: ""
              },
              {
                questionId: 3,
                answer: ""
              },
              {
                questionId: 4,
                answer: ""
              },
              { questionId: 5, answer: "" },
              { questionId: 6, answer: "" },
              { questionId: 7, answer: "" },
              { questionId: 8, answer: "" }
            ]
          },
          {
            sectionId: "5",
            answers: [
              {
                questionId: 1,
                answer: ""
              },
              {
                questionId: 2,
                answer: ""
              },
              {
                questionId: 3,
                answer: ""
              },
              {
                questionId: 4,
                answer: ""
              },
              { questionId: 5, answer: "" },
              { questionId: 6, answer: "" }
            ]
          }
        ]
      },
      evalulationQuestions: {
        sections: [
          {
            id: "1",
            name: "",
            questions: [
              {
                id: "1",
                questionType: "DEFAULT",
                question: "Email",
                required: true
              },
              {
                id: "2",
                questionType: "DEFAULT",
                question: "Firstname",
                required: true
              },
              {
                id: "3",
                questionType: "DEFAULT",
                question: "Last name",
                required: true
              },
              {
                id: "4",
                questionType: "BOOLEAN",
                question: "Gender",
                options: [
                  {
                    text: "Male",
                    value: "Male"
                  },
                  {
                    text: "Female",
                    value: "Female"
                  },
                  {
                    text: "Other",
                    value: "Other"
                  }
                ],
                required: true
              },
              {
                id: "5",
                questionType: "DEFAULT",
                question: "Country",
                required: true
              },
              {
                id: "6",
                questionType: "DEFAULT",
                question: "Contact Number",
                required: true
              }
            ]
          },
          {
            id: "2",
            name: "Section 2",
            questions: [
              {
                id: "1",
                questionType: "DEFAULT",
                question: "What is/are your expertise subject(s)?",
                required: true
              },
              {
                id: "2",
                questionType: "DEFAULT",
                question: "How long have you been tutoring? (In months/ years)",
                required: true
              },
              {
                id: "3",
                questionType: "DEFAULT",
                question: "Where have you tutored, and in what context?",
                required: true
              },
              {
                id: "4",
                questionType: "DEFAULT",
                question:
                  "What is/are your qualifications, certifications, or credentials? *",
                required: true
              },
              {
                id: "5",
                questionType: "DEFAULT",
                question: "Where can we find reviews from your past students?",
                required: true
              },
              {
                id: "6",
                questionType: "BOOLEAN",
                question:
                  "Do you have references or letters of recommendation? ",
                options: [
                  {
                    text: "Yes",
                    value: "Yes"
                  },
                  {
                    text: "No",
                    value: "No"
                  }
                ],

                required: true
              },
              {
                id: "7",
                questionType: "DEFAULT",
                question:
                  "Can you tell us about your expertise in the subject you mentioned above?",
                required: true
              },
              {
                id: "8",
                questionType: "DEFAULT",
                question:
                  "Where did you learn this subject? How have you used it in your profession? ",
                required: true
              },
              {
                id: "9",
                questionType: "DEFAULT",
                question: "What’s your track record?",
                required: true
              },
              {
                id: "10",
                questionType: "DEFAULT",
                question:
                  "What if a student have an exceptionality? Are you experienced in helping students with learning differences? ",
                required: true
              }
            ]
          },

          {
            id: "3",
            name: "Section 3",
            questions: [
              {
                id: "1",
                questionType: "DEFAULT",
                question: "What makes you a great tutor?",
                required: true
              },
              {
                id: "2",
                questionType: "DEFAULT",
                question: "Tell us about your teaching philosophy",
                required: true
              },
              {
                id: "3",
                questionType: "DEFAULT",
                question:
                  "TWhat strategies do you employ when starting work with a new student? ",
                required: true
              },
              {
                id: "4",
                questionType: "DEFAULT",
                question: "Can you tell us about your specific methods?",
                required: true
              },
              {
                id: "5",
                questionType: "DEFAULT",
                question:
                  "When you last tutored this subject, how did the experience change your current approach?",
                required: true
              },
              {
                id: "6",
                questionType: "DEFAULT",
                question:
                  "How will our unique needs affect your tutoring approach? ",
                required: true
              },
              {
                id: "7",
                questionType: "DEFAULT",
                question:
                  "What things can we do to help make our sessions productive?",
                required: true
              },
              {
                id: "8",
                questionType: "DEFAULT",
                question: "How do you measure progress? ",
                required: true
              }
            ]
          },

          {
            id: "4",
            name: "Section 4",
            questions: [
              {
                id: "1",
                questionType: "MULTI_CHOICE",
                question: "What’s your availability?",
                options: [
                  {
                    text: "Monday",
                    value: "Monday"
                  },
                  {
                    text: "Tuesday",
                    value: "Tuesday"
                  },
                  {
                    text: "Wednesday",
                    value: "Wednesday"
                  },
                  {
                    text: "Thursday",
                    value: "Thursday"
                  },
                  {
                    text: "Friday",
                    value: "Friday"
                  },
                  {
                    text: "Saturday",
                    value: "Saturday"
                  },
                  {
                    text: "Sunday",
                    value: "Sunday"
                  }
                ],
                required: true
              },
              {
                id: "2",
                questionType: "BOOLEAN",
                question: "Do you prefer in-person or online sessions?",
                options: [
                  {
                    text: "In-person",
                    value: "In-person"
                  },
                  {
                    text: "Online",
                    value: "Online"
                  }
                ],

                required: true
              },
              {
                id: "3",
                questionType: "BOOLEAN",
                question:
                  "Can you reliably tutor at times our schedule allows? ",
                options: [
                  {
                    text: "Yes",
                    value: "Yes"
                  },
                  {
                    text: "No",
                    value: "No"
                  },
                  {
                    text: "Other",
                    value: "Other"
                  }
                ],

                required: true
              },
              {
                id: "4",
                questionType: "BOOLEAN",
                question:
                  "Are you willing to set up a repeating session time reserved for our sessions? ",
                options: [
                  {
                    text: "Yes",
                    value: "Yes"
                  },
                  {
                    text: "No",
                    value: "No"
                  },
                  {
                    text: "Maybe",
                    value: "Maybe"
                  }
                ],

                required: true
              },
              {
                id: "5",
                questionType: "MULTI_CHOICE",
                question:
                  "How should we contact you if we need to change the time of a session? ",
                options: [
                  {
                    text: "Mail",
                    value: "Mail"
                  },
                  {
                    text: "Call",
                    value: "Call"
                  },
                  {
                    text: "Text",
                    value: "Text"
                  }
                ],

                required: true
              },
              {
                id: "6",
                questionType: "DEFAULT",
                question:
                  "(For in-person tutors) Where will tutoring sessions take place?",
                required: true
              },
              {
                id: "7",
                questionType: "DEFAULT",
                question:
                  "(For online tutors) Do you use the Stuttie online learning tool, or some other platform for online lessons?",
                required: true
              },
              {
                id: "8",
                questionType: "BOOLEAN",
                question:
                  "Will you be unavailable at any time during the period in which we plan to take lessons?",
                options: [
                  {
                    text: "Yes",
                    value: "Yes"
                  },
                  {
                    text: "No",
                    value: "No"
                  },
                  {
                    text: "Maybe",
                    value: "Maybe"
                  }
                ],
                required: true
              }
            ]
          },

          {
            id: "5",
            name: "Section 5",
            questions: [
              {
                id: "1",
                questionType: "DEFAULT",
                question: "How much do you charge per-hour? (in USD)",
                required: true
              },
              {
                id: "2",
                questionType: "BOOLEAN",
                question:
                  "Are you willing to negotiate your hourly fee in any case? ",
                options: [
                  {
                    text: "Yes",
                    value: "Yes"
                  },
                  {
                    text: "No",
                    value: "No"
                  }
                ],

                required: true
              },
              {
                id: "3",
                questionType: "BOOLEAN",
                question:
                  "Do you offer any discounts for multiple lessons or other situations? ",
                options: [
                  {
                    text: "Yes",
                    value: "Yes"
                  },
                  {
                    text: "No",
                    value: "No"
                  }
                ],

                required: true
              },
              {
                id: "4",
                questionType: "DEFAULT",
                question: "What is your cancellation policy? ",
                required: true
              },
              {
                id: "5",
                questionType: "BOOLEAN",
                question:
                  "Do you offer make-up sessions if one of us has to miss one?",
                options: [
                  {
                    text: "Yes",
                    value: "Yes"
                  },
                  {
                    text: "No",
                    value: "No"
                  },
                  {
                    text: "Maybe",
                    value: "Maybe"
                  }
                ],

                required: true
              },
              {
                id: "6",
                questionType: "DEFAULT",
                question:
                  "Are there other fees (for travel or materials, for example)? ",
                required: true
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.bg-lightblue {
  background-color: lightblue;
}
</style>
