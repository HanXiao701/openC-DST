import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18next from "i18next";
import FormControl from "@material-ui/core/FormControl";
import {CircularProgress, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Redirection from "./Redirection";

export default function CancelDialog(props) {
    const [cancelValue, setCancelValue] = React.useState("cancel_without_data");
    const [showButton, setShowButton] = React.useState(true);
    const [redirectAllowed, setRedirectAllowed] = React.useState(false);

    function handleChange(event) {
        setCancelValue(event.target.value);
    }

    // the redirection to the debriefing slides happens in RedirectComponent which is only rendered after 0.5s
    function handleOK() {
        if (cancelValue === "cancel_with_data" || cancelValue === "cancel_without_data") {
            setTimeout(() => setRedirectAllowed(true), 500);
            setShowButton(false);
        } else {
            if (cancelValue === "no_cancel") {
                props.handleCancelDialog();
            }
        }
    }

    return (
        <Dialog
            open={props.cancelDialogIsOpen}
            onClose={props.handleCancelDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {i18next.t('alertAbortStudy.header')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description alert"
                    className="alert-text"
                >
                    {i18next.t('cancelDialog.question')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="cancel" name="cancel" value={cancelValue} onChange={handleChange}>
                        <FormControlLabel value="cancel_without_data" control={<Radio />} label={i18next.t('cancelDialog.cancel_without_data')} />
                        <FormControlLabel value="cancel_with_data" control={<Radio />} label={i18next.t('cancelDialog.cancel_with_data')} />
                        <FormControlLabel value="no_cancel" control={<Radio />} label={i18next.t('cancelDialog.no_cancel')} />
                    </RadioGroup>
                </FormControl>
            </DialogActions>
            <DialogActions>
                <div className="center-horizontal">
                    {showButton
                        ? <Button
                            onClick={handleOK}
                            className="alert-buttons">OK</Button>
                        : ( redirectAllowed
                        ? <Redirection handleCancelDialog={props.handleCancelDialog}
                                       cancelValue={cancelValue}
                                       uploadFinalData={props.uploadFinalData}
                                       studyMetaTracker={props.studyMetaTracker}
                                />
                                : <CircularProgress/>
                        )
                    }
                </div>
            </DialogActions>
        </Dialog>
    );
}