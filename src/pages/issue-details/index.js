import { useParams } from 'react-router-dom';
import { useSelector, useService } from '@xstate/react';
import repoService from '../../machines/repo';
import ReactMarkdown from 'react-markdown';
import { Badge } from 'react-bootstrap';
import { useEffect } from 'react';


const issueStateClass = {
  open: 'success',
  closed: 'danger',
}

const IssueDetails = () => {
  const { number } = useParams();
  const [, repoSend] = useService(repoService);

  const repo = useSelector(repoService, (state) => state.context.data);
  const issue = useSelector(repoService, (state) => state.context.details) || {};
  const SUCCESS = useSelector(repoService, (state) => state.matches('SUCCESS'));

  useEffect(() => {
    if (number && SUCCESS) {
      repoSend({type: 'fetchIssueDetails', data: {number}})
    }
  }, [number, repoSend, SUCCESS])

  return (
    <div>
      <h1>{repo?.full_name}</h1>
      <h2>{issue.title} #{issue.number}</h2>
      <div className="issue-status">
        <Badge variant={issueStateClass[issue.state]}>{issue.state}</Badge>
        {/* {issue.labels?.map((l) => (
          <Badge variant="default">{l.name}</Badge>
        ))} */}
      </div>
      <ReactMarkdown>{issue.body}</ReactMarkdown>
    </div>
  )
}

export default IssueDetails;
