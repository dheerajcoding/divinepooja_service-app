import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Stack,
  TextField as MuiTextField,
  Divider,
  Alert,
  Tooltip,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import RestoreIcon from '@mui/icons-material/Restore';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { useData } from '../context/DataContext';
import { adminLogin, adminLogout, onAdminAuthChange, isFirebaseConfigured } from '../firebase';
import { siteConfig } from '../config';

/* Local-only fallback password gate (used when Firebase isn't configured). */
const LOCAL_SESSION_KEY = 'pujaribaba:admin:local';
const LEGACY_LOCAL_SESSION_KEY = 'divinepooja:admin:local';
const localIsAuthed = () => sessionStorage.getItem(LOCAL_SESSION_KEY) === '1' || sessionStorage.getItem(LEGACY_LOCAL_SESSION_KEY) === '1';
const localLogin = (pw) => {
  if (pw && pw === siteConfig.admin.password) {
    sessionStorage.setItem(LOCAL_SESSION_KEY, '1');
    return true;
  }
  return false;
};
const localLogout = () => {
  sessionStorage.removeItem(LOCAL_SESSION_KEY);
  sessionStorage.removeItem(LEGACY_LOCAL_SESSION_KEY);
};

/* ───────────────── Login screen ───────────────── */

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Immediate master password bypass - works anytime!
    if (localLogin(pw)) {
      onLogin();
      return;
    }

    // 2. If Firebase is configured and user supplied an email, try Firebase Authentication
    if (isFirebaseConfigured && email.trim()) {
      setBusy(true);
      try {
        await adminLogin(email.trim().toLowerCase(), pw);
        onLogin();
      } catch (err) {
        // Fallback: check if password matches master password even if Firebase returned error
        if (localLogin(pw)) {
          onLogin();
          return;
        }

        const code = err?.code || '';
        let msg = err?.message?.replace('Firebase: ', '') || 'Login failed';
        if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
          msg = 'Wrong email or password. You can sign in using the Master Admin Password (default: admin123) or verify this account in Firebase Console.';
        } else if (code === 'auth/too-many-requests') {
          msg = 'Too many failed attempts. You can log in using the Master Admin Password (default: admin123).';
        } else if (code === 'auth/network-request-failed') {
          msg = 'Network error — check your connection, or sign in using the Master Admin Password.';
        }
        setError(msg);
      } finally {
        setBusy(false);
      }
    } else {
      if (localLogin(pw)) {
        onLogin();
      } else {
        setError('Incorrect password. Please enter your Firebase password or Master Password.');
      }
    }
  };

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', backgroundColor: '#FFF8DC' }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 1 }}>
            🔒 Admin Login
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: '#5D4E37', mb: 3 }}>
            {isFirebaseConfigured
              ? 'Sign in with your Firebase admin email or use the Master Admin Password.'
              : 'Enter the admin password to manage poojas, packages and testimonials.'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            {isFirebaseConfigured && (
              <TextField
                fullWidth
                type="email"
                label="Admin Email (optional if using Master Password)"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoFocus
                sx={{ mb: 2 }}
                placeholder="e.g. dheerajk0206@gmail.com"
              />
            )}
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(''); }}
              error={!!error}
              helperText={error}
              autoFocus={!isFirebaseConfigured}
              sx={{ mb: 2 }}
              required
            />
            <Button type="submit" fullWidth variant="contained" size="large" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </Button>
            <Typography variant="caption" display="block" align="center" sx={{ mt: 2, color: '#8C7355' }}>
              💡 Master Password fallback is enabled so you are never locked out.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

/* ───────────────── Reusable helpers ───────────────── */

const csvToList = (v) => (v || '').split(',').map((s) => s.trim()).filter(Boolean);
const listToCsv = (a) => (Array.isArray(a) ? a.join(', ') : '');

/* TextField that lets the user freely type commas. Internally keeps a
   raw string; only splits to an array on blur (and reports via onChange). */
const CsvField = ({ value, onChange, label, fullWidth = true, ...rest }) => {
  const [text, setText] = useState(listToCsv(value));
  const lastValueRef = useRef(value);
  // Sync if the parent value changes externally (e.g. dialog re-opened).
  useEffect(() => {
    if (value !== lastValueRef.current) {
      lastValueRef.current = value;
      setText(listToCsv(value));
    }
  }, [value]);
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => {
        const arr = csvToList(text);
        lastValueRef.current = arr;
        onChange(arr);
      }}
      {...rest}
    />
  );
};

const TabPanel = ({ value, index, children }) =>
  value === index ? <Box sx={{ pt: 3 }}>{children}</Box> : null;

/* Reads a File and returns a JPEG data URL resized so the longest side
   is at most `maxSide` pixels — keeps Firestore docs small. */
/* Reads a File and returns a JPEG data URL resized to standard card dimensions (~800x480).
   In 'fit' mode, it scales the whole image so NOT A SINGLE PIXEL is cut, and draws a smooth,
   blurred ambient backdrop of the same photo to fill any letterbox areas seamlessly. */
const fileToResizedDataUrl = (file, fitMode = 'fit', targetW = 800, targetH = 480, quality = 0.85) =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file (JPG, PNG, WEBP, etc.).'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode the image.'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');

        if (fitMode === 'fit') {
          // 1. Draw blurred ambient backdrop so the card is completely filled without black bars
          ctx.save();
          const bgScale = Math.max(targetW / img.width, targetH / img.height);
          const bgW = img.width * bgScale;
          const bgH = img.height * bgScale;
          const bgX = (targetW - bgW) / 2;
          const bgY = (targetH - bgH) / 2;
          ctx.filter = 'blur(16px) brightness(0.65)';
          ctx.drawImage(img, bgX, bgY, bgW, bgH);
          ctx.restore();

          // 2. Draw subtle dark tint over the blur for sacred contrast
          ctx.fillStyle = 'rgba(25, 12, 6, 0.35)';
          ctx.fillRect(0, 0, targetW, targetH);

          // 3. Draw full crisp image in the center (NEVER cropped)
          const scale = Math.min(targetW / img.width, targetH / img.height);
          const fgW = Math.round(img.width * scale);
          const fgH = Math.round(img.height * scale);
          const fgX = Math.round((targetW - fgW) / 2);
          const fgY = Math.round((targetH - fgH) / 2);

          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowBlur = 14;
          ctx.drawImage(img, fgX, fgY, fgW, fgH);

          resolve(canvas.toDataURL('image/jpeg', quality));
        } else if (fitMode === 'crop') {
          // Fill & crop center
          const scale = Math.max(targetW / img.width, targetH / img.height);
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const x = Math.round((targetW - w) / 2);
          const y = Math.round((targetH - h) / 2);
          ctx.drawImage(img, x, y, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          // Original aspect ratio, scaled to maxSide
          const scale = Math.min(1, targetW / Math.max(img.width, img.height));
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          canvas.width = w; canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

/* Image URL input + "Upload from device" button with smart fit mode & card preview. */
const ImagePicker = ({ value, onChange, label = 'Image', helperText }) => {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [fitMode, setFitMode] = useState('fit'); // 'fit', 'crop', 'original'

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-picking same file
    if (!file) return;
    setErr(''); setBusy(true);
    try {
      const dataUrl = await fileToResizedDataUrl(file, fitMode);
      onChange(dataUrl);
    } catch (ex) {
      setErr(ex.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ p: 1.5, borderRadius: 2.5, backgroundColor: 'rgba(255, 248, 235, 0.6)', border: '1px solid rgba(229, 169, 16, 0.3)' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="flex-start" sx={{ mb: 1.5 }}>
        <TextField
          fullWidth
          label={label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          helperText={err || helperText || 'Paste an image URL, or upload from your device →'}
          error={!!err}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<UploadIcon />}
          disabled={busy}
          sx={{
            whiteSpace: 'nowrap',
            mt: { xs: 0, sm: 1 },
            background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
            color: 'white',
            fontWeight: 700,
            borderRadius: 50,
            px: 2.5,
          }}
        >
          {busy ? 'Fitting…' : 'Upload Image'}
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
        </Button>
      </Stack>

      {/* Fit Mode Selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#331C10' }}>
          Upload Fit Mode:
        </Typography>
        <Chip
          label="✨ Fit Whole Photo (No Crop)"
          size="small"
          onClick={() => setFitMode('fit')}
          sx={{
            cursor: 'pointer',
            fontWeight: 600,
            backgroundColor: fitMode === 'fit' ? '#FF7700' : 'white',
            color: fitMode === 'fit' ? 'white' : '#664E3D',
            border: '1px solid rgba(229, 169, 16, 0.4)',
          }}
        />
        <Chip
          label="✂️ Fill & Crop to 16:9"
          size="small"
          onClick={() => setFitMode('crop')}
          sx={{
            cursor: 'pointer',
            fontWeight: 600,
            backgroundColor: fitMode === 'crop' ? '#FF7700' : 'white',
            color: fitMode === 'crop' ? 'white' : '#664E3D',
            border: '1px solid rgba(229, 169, 16, 0.4)',
          }}
        />
      </Box>

      {value && (
        <Box sx={{ mt: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#664E3D', fontWeight: 600, display: 'block', mb: 0.5 }}>
            Website Card Preview (Deity & ritual image will appear like this):
          </Typography>
          <Box
            sx={{
              width: 240,
              height: 140,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2.5,
              backgroundColor: '#1E110A',
              border: '1.5px solid rgba(229, 169, 16, 0.45)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: -10,
                backgroundImage: `url(${value})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'blur(12px) brightness(0.65)',
                transform: 'scale(1.15)',
              }}
            />
            <Box
              component="img"
              src={value}
              alt="preview"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 1,
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))',
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

/* ───────────────── Pooja editor dialog ───────────────── */

const emptyPooja = {
  name: '', description: '', category: '', image: '/images/image17.avif',
  duration: 1, price: 0, originalPrice: 0,
  rating: 5, reviews: 0,
  benefits: [], samagri: [],
  priest: '', experience: '', languages: [],
  isPopular: false, isOffer: false,
};

const PoojaDialog = ({ open, initial, onClose, onSave }) => {
  const [form, setForm] = useState(emptyPooja);
  useEffect(() => {
    if (open) setForm({ ...emptyPooja, ...(initial || {}) });
  }, [open, initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    onSave({
      ...form,
      duration: Number(form.duration) || 0,
      price: Number(form.price) || 0,
      originalPrice: Number(form.originalPrice) || Number(form.price) || 0,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
    });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle>{initial?.id ? 'Edit Pooja' : 'Add New Pooja'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField fullWidth required label="Pooja Name" value={form.name}
              onChange={(e) => set('name', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Category" value={form.category}
              onChange={(e) => set('category', e.target.value)}
              placeholder="e.g. Prosperity" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={2} label="Description"
              value={form.description} onChange={(e) => set('description', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth required type="number" label="Price (₹)"
              value={form.price} onChange={(e) => set('price', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="number" label="Original Price (₹)"
              helperText="Leave 0 if no discount"
              value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="number" label="Duration (hours)"
              value={form.duration} onChange={(e) => set('duration', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <ImagePicker
              label="Pooja Image"
              value={form.image}
              onChange={(v) => set('image', v)}
              helperText="Paste an https:// URL, or click Upload to pick a photo from your computer (it will be auto-resized to ~800px)."
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="number" inputProps={{ step: 0.1, min: 0, max: 5 }}
              label="Rating" value={form.rating}
              onChange={(e) => set('rating', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="number" label="Reviews count"
              value={form.reviews} onChange={(e) => set('reviews', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <CsvField label="Benefits (comma-separated)"
              value={form.benefits}
              onChange={(v) => set('benefits', v)} />
          </Grid>
          <Grid item xs={12}>
            <CsvField label="Samagri (comma-separated)"
              value={form.samagri}
              onChange={(v) => set('samagri', v)} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField fullWidth label="Priest" value={form.priest}
              onChange={(e) => set('priest', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Experience" value={form.experience}
              onChange={(e) => set('experience', e.target.value)}
              placeholder="e.g. 8 years" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CsvField label="Languages (comma-separated)"
              value={form.languages}
              onChange={(v) => set('languages', v)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Switch checked={!!form.isPopular} onChange={(e) => set('isPopular', e.target.checked)} />}
              label="Show as Popular on Home"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Switch checked={!!form.isOffer} onChange={(e) => set('isOffer', e.target.checked)} />}
              label="Mark as Limited-time Offer"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!form.name.trim()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

/* ───────────────── Package editor dialog ───────────────── */

const emptyPackage = {
  name: '', description: '',
  poojas: [],
  originalPrice: 0, discountedPrice: 0, savings: 0,
  features: [],
};

const PackageDialog = ({ open, initial, onClose, onSave }) => {
  const [form, setForm] = useState(emptyPackage);
  useEffect(() => {
    if (open) setForm({ ...emptyPackage, ...(initial || {}) });
  }, [open, initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    const orig = Number(form.originalPrice) || 0;
    const disc = Number(form.discountedPrice) || 0;
    onSave({
      ...form,
      originalPrice: orig,
      discountedPrice: disc,
      savings: Math.max(0, orig - disc),
    });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle>{initial?.id ? 'Edit Package' : 'Add New Package'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth required label="Package Name"
              value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={2} label="Description"
              value={form.description} onChange={(e) => set('description', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <CsvField label="Included Poojas (comma-separated names)"
              value={form.poojas}
              onChange={(v) => set('poojas', v)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required type="number" label="Original Price (₹)"
              value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required type="number" label="Discounted Price (₹)"
              value={form.discountedPrice} onChange={(e) => set('discountedPrice', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <CsvField label="Features (comma-separated)"
              value={form.features}
              onChange={(v) => set('features', v)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!form.name.trim()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

/* ───────────────── Testimonial dialog ───────────────── */

const emptyTestimonial = { name: '', location: '', rating: 5, text: '', pooja: '', date: '' };

const TestimonialDialog = ({ open, initial, onClose, onSave }) => {
  const [form, setForm] = useState(emptyTestimonial);
  useEffect(() => {
    if (open) setForm({ ...emptyTestimonial, ...(initial || {}) });
  }, [open, initial]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth fullScreen={isMobile}>
      <DialogTitle>{initial?.id ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required label="Customer Name"
              value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Location"
              value={form.location} onChange={(e) => set('location', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Pooja Booked"
              value={form.pooja} onChange={(e) => set('pooja', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="number" inputProps={{ min: 1, max: 5 }}
              label="Rating" value={form.rating}
              onChange={(e) => set('rating', Number(e.target.value) || 0)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="date" InputLabelProps={{ shrink: true }}
              label="Date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required multiline rows={3} label="Testimonial"
              value={form.text} onChange={(e) => set('text', e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)} disabled={!form.name.trim() || !form.text.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/* ───────────────── Confirm delete ───────────────── */

const ConfirmDialog = ({ open, title, message, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent><Typography>{message}</Typography></DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button color="error" variant="contained" onClick={onConfirm}>Delete</Button>
    </DialogActions>
  </Dialog>
);

/* ───────────────── Main Admin component ───────────────── */

const AdminPanel = ({ onLogout }) => {
  const data = useData();
  const [tab, setTab] = useState(0);
  const [poojaDialog, setPoojaDialog] = useState({ open: false, initial: null });
  const [packageDialog, setPackageDialog] = useState({ open: false, initial: null });
  const [testiDialog, setTestiDialog] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false });
  const [snack, setSnack] = useState({ open: false, message: '' });
  const fileInputRef = useRef(null);

  const notify = (message) => setSnack({ open: true, message });

  const totalRevenuePerPooja = useMemo(
    () => data.poojas.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    [data.poojas]
  );

  /* CRUD wrappers */
  const savePooja = (form) => {
    if (poojaDialog.initial?.id) {
      data.updatePooja(poojaDialog.initial.id, form);
      notify('Pooja updated');
    } else {
      data.addPooja(form);
      notify('Pooja added');
    }
    setPoojaDialog({ open: false, initial: null });
  };
  const savePackage = (form) => {
    if (packageDialog.initial?.id) {
      data.updatePackage(packageDialog.initial.id, form);
      notify('Package updated');
    } else {
      data.addPackage(form);
      notify('Package added');
    }
    setPackageDialog({ open: false, initial: null });
  };
  const saveTesti = (form) => {
    if (testiDialog.initial?.id) {
      data.updateTestimonial(testiDialog.initial.id, form);
      notify('Testimonial updated');
    } else {
      data.addTestimonial(form);
      notify('Testimonial added');
    }
    setTestiDialog({ open: false, initial: null });
  };

  const askDelete = (label, fn) =>
    setConfirm({
      open: true,
      title: `Delete ${label}?`,
      message: `This action cannot be undone.`,
      onConfirm: () => { fn(); setConfirm({ open: false }); notify(`${label} deleted`); },
    });

  /* Export / Import */
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data.exportData(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pujaribaba-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('Data exported');
  };
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        if (data.importData(json)) notify('Data imported');
        else notify('Invalid file');
      } catch {
        notify('Could not parse JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF8DC', py: 4 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h4" sx={{ color: '#FF9933', fontWeight: 'bold' }}>
              🕉️ Admin Dashboard
            </Typography>
            <Tooltip title={data.source === 'firestore'
              ? 'Live-synced with Firebase Firestore — changes are visible to all visitors instantly.'
              : 'Local-only mode (Firebase not configured). Changes only persist in this browser.'}>
              <Chip
                size="small"
                color={data.source === 'firestore' ? 'success' : 'warning'}
                icon={data.source === 'firestore' ? <CloudDoneIcon /> : <CloudOffIcon />}
                label={data.source === 'firestore' ? 'Cloud synced' : 'Local only'}
              />
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Download a JSON backup of all data">
              <Button startIcon={<DownloadIcon />} onClick={handleExport}>Export</Button>
            </Tooltip>
            <Tooltip title="Restore data from a previous JSON backup">
              <Button startIcon={<UploadIcon />} onClick={() => fileInputRef.current?.click()}>Import</Button>
            </Tooltip>
            <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleImport} />
            <Tooltip title="Reset everything to the original sample data">
              <Button startIcon={<RestoreIcon />} color="warning" onClick={() =>
                setConfirm({
                  open: true,
                  title: 'Reset all data?',
                  message: 'This replaces the current data with the original samples. Backup first if unsure.',
                  onConfirm: () => { data.resetToDefaults(); setConfirm({ open: false }); notify('Reset to defaults'); },
                })
              }>Reset</Button>
            </Tooltip>
            <Button startIcon={<LogoutIcon />} color="inherit" onClick={onLogout}>Logout</Button>
          </Stack>
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          Changes are saved instantly in this browser and shown on the public website.
          Use <strong>Export</strong> regularly to keep a backup, and <strong>Import</strong> to
          restore on another device or after clearing browser data.
        </Alert>

        {/* Quick stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: '#FF9933', fontWeight: 'bold' }}>{data.poojas.length}</Typography>
              <Typography variant="body2">Poojas</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: '#FF9933', fontWeight: 'bold' }}>{data.packages.length}</Typography>
              <Typography variant="body2">Packages</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: '#FF9933', fontWeight: 'bold' }}>{data.testimonials.length}</Typography>
              <Typography variant="body2">Testimonials</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: '#FF9933', fontWeight: 'bold' }}>₹{totalRevenuePerPooja.toLocaleString()}</Typography>
              <Typography variant="body2">Catalogue value</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ borderRadius: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
          >
            <Tab label={`Poojas (${data.poojas.length})`} />
            <Tab label={`Packages (${data.packages.length})`} />
            <Tab label={`Testimonials (${data.testimonials.length})`} />
            <Tab label="Site Stats" />
          </Tabs>

          {/* POOJAS */}
          <TabPanel value={tab} index={0}>
            <Box sx={{ px: 2, pb: 2 }}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button variant="contained" startIcon={<AddIcon />}
                  onClick={() => setPoojaDialog({ open: true, initial: null })}>
                  Add Pooja
                </Button>
              </Stack>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(255, 238, 204, 0.85)' }}>
                      <TableCell sx={{ fontWeight: 'bold', width: 60 }}>Image</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">Price</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Duration</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Flags</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.poojas.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell sx={{ width: 60, py: 1 }}>
                          <Box
                            sx={{
                              width: 52,
                              height: 34,
                              position: 'relative',
                              overflow: 'hidden',
                              borderRadius: 1.5,
                              backgroundColor: '#1E110A',
                              border: '1px solid rgba(229, 169, 16, 0.4)',
                            }}
                          >
                            <Box
                              component="img"
                              src={p.image}
                              alt={p.name}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{p.priest || '—'}</Typography>
                        </TableCell>
                        <TableCell>{p.category && <Chip size="small" label={p.category} />}</TableCell>
                        <TableCell align="right">
                          ₹{p.price}
                          {p.originalPrice > p.price && (
                            <Typography variant="caption" sx={{ display: 'block', textDecoration: 'line-through', color: 'text.secondary' }}>
                              ₹{p.originalPrice}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">{p.duration} hr</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5}>
                            {p.isPopular && <Chip size="small" color="warning" label="Popular" />}
                            {p.isOffer && <Chip size="small" color="error" label="Offer" />}
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => setPoojaDialog({ open: true, initial: p })}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error"
                            onClick={() => askDelete(`pooja "${p.name}"`, () => data.deletePooja(p.id))}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {data.poojas.length === 0 && (
                      <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                        No poojas yet. Click <strong>Add Pooja</strong> above.
                      </TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          {/* PACKAGES */}
          <TabPanel value={tab} index={1}>
            <Box sx={{ px: 2, pb: 2 }}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button variant="contained" startIcon={<AddIcon />}
                  onClick={() => setPackageDialog({ open: true, initial: null })}>
                  Add Package
                </Button>
              </Stack>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#FFE4B5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Includes</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">Price</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">Savings</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.packages.map((pkg) => (
                      <TableRow key={pkg.id} hover>
                        <TableCell>
                          <Typography sx={{ fontWeight: 600 }}>{pkg.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{pkg.description}</Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                            {(pkg.poojas || []).map((p) => <Chip key={p} size="small" label={p} />)}
                          </Stack>
                        </TableCell>
                        <TableCell align="right">
                          ₹{pkg.discountedPrice}
                          {pkg.originalPrice > pkg.discountedPrice && (
                            <Typography variant="caption" sx={{ display: 'block', textDecoration: 'line-through', color: 'text.secondary' }}>
                              ₹{pkg.originalPrice}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {pkg.savings > 0 ? <Chip size="small" color="success" label={`₹${pkg.savings}`} /> : '—'}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => setPackageDialog({ open: true, initial: pkg })}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error"
                            onClick={() => askDelete(`package "${pkg.name}"`, () => data.deletePackage(pkg.id))}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {data.packages.length === 0 && (
                      <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                        No packages yet.
                      </TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          {/* TESTIMONIALS */}
          <TabPanel value={tab} index={2}>
            <Box sx={{ px: 2, pb: 2 }}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button variant="contained" startIcon={<AddIcon />}
                  onClick={() => setTestiDialog({ open: true, initial: null })}>
                  Add Testimonial
                </Button>
              </Stack>
              <Grid container spacing={2}>
                {data.testimonials.map((t) => (
                  <Grid item xs={12} md={6} key={t.id}>
                    <Paper sx={{ p: 2, position: 'relative' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography sx={{ fontWeight: 'bold' }}>{t.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t.location} · {t.pooja} · ⭐ {t.rating}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton size="small" onClick={() => setTestiDialog({ open: true, initial: t })}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error"
                            onClick={() => askDelete(`testimonial from ${t.name}`, () => data.deleteTestimonial(t.id))}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Stack>
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>"{t.text}"</Typography>
                    </Paper>
                  </Grid>
                ))}
                {data.testimonials.length === 0 && (
                  <Grid item xs={12}>
                    <Typography align="center" color="text.secondary" sx={{ py: 4 }}>No testimonials yet.</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </TabPanel>

          {/* STATS */}
          <TabPanel value={tab} index={3}>
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                These numbers appear in the “Our Impact” section on the homepage. Keep them honest.
              </Typography>
              <Grid container spacing={2}>
                {[
                  ['totalPoojas', 'Poojas Performed'],
                  ['happyCustomers', 'Happy Customers'],
                  ['experiencedPriests', 'Expert Priests'],
                  ['yearsOfService', 'Years of Service'],
                ].map(([key, label]) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <MuiTextField
                      fullWidth
                      type="number"
                      label={label}
                      value={data.stats[key] ?? 0}
                      onChange={(e) => data.updateStats({ [key]: Number(e.target.value) || 0 })}
                    />
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Typography variant="caption" color="text.secondary">
                Auto-saved as you type.
              </Typography>
            </Box>
          </TabPanel>
        </Paper>
      </Container>

      {/* Dialogs */}
      <PoojaDialog
        open={poojaDialog.open}
        initial={poojaDialog.initial}
        onClose={() => setPoojaDialog({ open: false, initial: null })}
        onSave={savePooja}
      />
      <PackageDialog
        open={packageDialog.open}
        initial={packageDialog.initial}
        onClose={() => setPackageDialog({ open: false, initial: null })}
        onSave={savePackage}
      />
      <TestimonialDialog
        open={testiDialog.open}
        initial={testiDialog.initial}
        onClose={() => setTestiDialog({ open: false, initial: null })}
        onSave={saveTesti}
      />
      <ConfirmDialog
        open={!!confirm.open}
        title={confirm.title}
        message={confirm.message}
        onClose={() => setConfirm({ open: false })}
        onConfirm={confirm.onConfirm}
      />
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack({ open: false, message: '' })}
        message={snack.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  );
};

/* ───────────────── Page wrapper with auth gate ───────────────── */

const Admin = () => {
  const [authed, setAuthed] = useState(() => localIsAuthed());

  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    return onAdminAuthChange((user) => {
      if (user) {
        setAuthed(true);
      } else if (!localIsAuthed()) {
        setAuthed(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    localLogout();
    if (isFirebaseConfigured) {
      try {
        await adminLogout();
      } catch (err) {
        // ignore
      }
    }
    setAuthed(false);
  };

  return authed
    ? <AdminPanel onLogout={handleLogout} />
    : <AdminLogin onLogin={() => setAuthed(true)} />;
};

export default Admin;
