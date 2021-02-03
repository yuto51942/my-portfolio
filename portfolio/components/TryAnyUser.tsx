import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    textArea: {
      width: '300px',
      marginRight: '.5rem'
    },
    description: {
      fontWeight: 300,
      fontSize: '1.7rem',
      margin: '1rem 1rem 2rem 1rem'
    }
  })
)

export default function TryAnyUserForm( { text, initForm }: {text: string, initForm: string}) {
  const classes = useStyles()
  const router = useRouter()
  const [isTryAnyUser, setIsTryAnyUser] = React.useState(false)
  const [anyUserName, setAnyUserName] = React.useState(initForm)
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    if(isTryAnyUser){
      setIsTryAnyUser(false)
      if(anyUserName === ''){
        setIsError(true)
        return
      }
      setIsError(false)

      router.replace(`/skills/user?name=${anyUserName}`)
    }
  }, [isTryAnyUser])

  return (
    <div className={classes.root}>
      <p className={classes.description}>{text}</p>
      <TextField
        label="GitHubユーザー名"
        size="small"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAnyUserName(event.target.value)}
        value={anyUserName}
        className={classes.textArea}
        error={isError}
        color='secondary' />
      <Button variant="contained" color='secondary' onClick={() => setIsTryAnyUser(true)}>Go!</Button>
    </div>
  )
}