
import SubmittedAnswer from '../../../components/SubmittedAnswer/SubmittedAnswer';

interface props{
    submittedAnswers: { id: number, player_id: number, question_index: number, round_index: number, contents: string }[],
    handleDelete: (element:any) => void,
    roundNum: number,
    questionNum: number
}
const Submissions = ({submittedAnswers, handleDelete, roundNum, questionNum}:props) => {

    

    return (
        <div>
            {submittedAnswers &&
        submittedAnswers.map((submittedAnswer) => (
          //submittedAnswer.question_index === questionNum && submittedAnswer.round_index === roundNum
          <SubmittedAnswer
            roundNum={roundNum}
            questionNum={questionNum}
            submittedAnswer={submittedAnswer}
            handleDelete={handleDelete}
            key={submittedAnswer.id}
          ></SubmittedAnswer>))}
        </div>
    )
}

export default Submissions